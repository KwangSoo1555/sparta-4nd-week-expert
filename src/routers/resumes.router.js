import express, { application } from 'express';

import { prisma } from '../utils/prisma.util.js';
import { verifyAccessToken } from '../middlewares/require-access-token.middleware.js';
import { resumePostValidation } from '../middlewares/joi-handler.middleware.js';

const router = express.Router();

router.post('/post', verifyAccessToken, async (req, res, next) => {
  try {
    const resumePostVal = await resumePostValidation.validateAsync(req.body);
    const userId = req.userId;
    const { title, introduce } = resumePostVal;

    const resumeCreate = await prisma.resume.create({
      data: {
        UserId: userId,
        title,
        introduce,
      },
    });

    return res.status(201).json({
      id: resumeCreate.UserId,
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

router.get('/get', verifyAccessToken, async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export { router };
