import createHttpError from 'http-errors';
import prisma from '../db/prismaClient.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
      return next(createHttpError(401, 'Please provide Authorization header'));
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      return next(createHttpError(401, 'Auth header should be of type Bearer'));
    }

    // 1️⃣ Шукаємо сесію по токену
    const session = await prisma.session.findUnique({
      where: { accessToken: token },
    });

    if (!session) {
      return next(createHttpError(401, 'Session not found'));
    }

    // 2️⃣ Перевіряємо чи токен не прострочений
    const isAccessTokenExpired = new Date() > new Date(session.accessTokenValidUntil);

    if (isAccessTokenExpired) {
      return next(createHttpError(401, 'Access token expired'));
    }

    // 3️⃣ Шукаємо користувача по ID з сесії
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });

    if (!user) {
      return next(createHttpError(401, 'User not found'));
    }

    // 4️⃣ Зберігаємо користувача і токен у req
    req.user = user;
    req.accessToken = token;

    next();
  } catch (err) {
    next(err);
  }
};
