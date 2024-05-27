import express from 'express';

import { prisma } from '../utils/prisma.util.js';
import { verifyAccessToken } from '../middlewares/require-access-token.middleware.js';
import { resumePostValidation } from '../middlewares/joi-handler.middleware.js';

const router = express.Router();

router.post('/post', verifyAccessToken, async (req, res, next) => {
    try {
        const resumePostVal = await resumePostValidation.validateAsync(req.body);
        const UserId = req.userId;
        const { title, introduce } = resumePostVal;

        if (!UserId) {
            return res.status(400).json({ error: 'User ID not provided' });
        }

        const resumeCreate = await prisma.resume.create({
            data: {
                UserId: UserId,
                title,
                introduce
            }
        });

        return res.status(201).json({
            UserId: resumeCreate.UserId,
            resumeId: resumeCreate.resumeId,
            title: resumeCreate.title,
            introduce: resumeCreate.introduce,
            applicationStatus: resumeCreate.applicationStatus,
            createdAt: resumeCreate.createdAt,
            updatedAt: resumeCreate.updatedAt,
        });
    } catch (error) {
        next(error);
    }
});

router.get('/', verifyAccessToken, async (req, res, next) => {
    try {
        const UserId = req.userId;

        if (!UserId) {
            return res.status(400).json({ error: 'User ID not provided' });
        }

        let sortDirection = 'DESC';
        const { sort } = req.query;
        if (sort && sort.toLowerCase() === 'asc') {
            sortDirection = 'ASC';
        };

        const resumeSearch = await prisma.resume.findMany({
            where: { UserId: UserId },
            orderBy: { createdAt: sortDirection },
            select: {
                resumeId: true,
                title: true,
                introduce: true,
                applicationStatus: true,
                createdAt: true,
                updatedAt: true,
                Users: { select: { name: true } }
            }
        });

        if (resumeSearch.length === 0) {
            return res.status(200).json([]);
        };

        return res.status(200).json({ resumeSearch });

    } catch (error) {
        next(error);
    }
});

router.get('/?userId', verifyAccessToken, async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
})

export { router };
