import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import RequestWithAuth from '../types/RequestWithAuth';

interface Token {
  userId: string;
}

export default (req: RequestWithAuth, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      throw new Error('Authorization header is needed');
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET') as Token;
    const { userId } = decodedToken;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw new Error('Invalid user ID');
    }
    next();
  } catch (e) {
    res.status(401).json({
      error: `${e.name} : ${e.message}`
    });
  }
};
