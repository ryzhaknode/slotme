import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { env } from './env.js';

export const parseToken = (token, tokenType) => {
  try {
    const secretKey = tokenType === 'refresh' ? env('JWT_REFRESH_SECRET') : env('JWT_ACCESS_SECRET');

    const payload = jwt.verify(token, secretKey);

    return payload;
  } catch (err) {
    throw createHttpError(401, `Invalid or expired ${tokenType} token`);
  }
};
