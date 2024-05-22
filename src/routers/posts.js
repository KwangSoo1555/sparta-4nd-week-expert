import express from 'express';
import bcrypt from 'bcrypt';
import {prisma} from '../utils/prisma.util.js';

const router = express.Router();