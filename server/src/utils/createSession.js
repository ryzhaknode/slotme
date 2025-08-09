import jwt from 'jsonwebtoken';
import { env } from './env.js';
import { ACCESS_TOKEN_LIFETIME, REFRESH_TOKEN_LIFETIME } from '../constants/index.js';

export const createSession = (id) => {
  const accessToken = jwt.sign(
    {
      id: id,
    },
    env('JWT_ACCESS_SECRET'),
    {
      expiresIn: '15m',
    },
  );

  const refreshToken = jwt.sign({ id: id }, env('JWT_REFRESH_SECRET'), {
    expiresIn: '30d',
  });

  return {
    userId: id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_LIFETIME),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_LIFETIME),
  };
};
