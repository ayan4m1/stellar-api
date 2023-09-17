import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../modules/asyncHandler';

import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '../../.env' });

const prisma = new PrismaClient();
const router = express.Router();

router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        userRank: true
      }
    });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  })
);

router.post(
  '/',
  [
    check('username', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });

    const defaultRank = await prisma.userRank.findFirst({
      where: { field1: 100 }
    });

    if (!defaultRank) {
      throw new Error('Default rank not found');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        avatar,
        userRankId: defaultRank.id
      }
    });

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.STELLAR_AUTH_JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user });
      }
    );
  })
);

export default router;
