import express from 'express';
import prisma from '../utils/prisma.util.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { signupValidation, loginValidation } from '../middlewares/joi-handler.middleware.js';

const router = express.Router();
const saltRounds = 10;

router.post('/signup', async (req, res, next) => {
    try {
        const signupVal = await signupValidation.validateAsync(req.body);
        const { name, email, password, passwordCheck } = signupVal;

        const isExistUser = await prisma.users.findFirst({
            where: { OR: [{ name }, { email }] },
        });
        if (isExistUser) {
            return res.status(409).json({ message: 'This email or name are already exist.' });
        };

        if (password !== passwordCheck) {
            return res.status(400).json({ message: 'Passwords do not match.' });
        };

        const hashedPW = await bcrypt.hash(password, saltRounds);

        const usersCreate = await prisma.users.create({
            data: {
                name,
                email,
                password: hashedPW,
                passwordCheck: hashedPW,
            }
        });

        return res.status(201).json({
            id: usersCreate.userId,
            email: usersCreate.email,
            name: usersCreate.name,
            role: usersCreate.role,
            createdAt: usersCreate.createdAt,
            updatedAt: usersCreate.updatedAt,
        });
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const loginVal = await loginValidation.validateAsync(req.body);
        const { email, password } = loginVal;

        const registeredUser = await prisma.users.findFirst({ where: { email } });
        if (!registeredUser) {
            return res.status(401).json({ message: 'This email is not exist' });
        };

        const matchPW = await bcrypt.compare(password, registeredUser.password);
        if (!matchPW) {
            return res.status(401).json({ message: 'Password is not matched' });
        };

        const token = jwt.sign(
            { userId: registeredUser.userId },
            process.env.JWT_SECRET,
            { expiresIn: '12h' }
        );

        res.cookie('authorization', token, { httpOnly: true });
        return res.status(200).json({ 
            message: 'Login successful', 
            accessToken: token
        });

    } catch (error) {
        next(error);
    }
});

export { router };
