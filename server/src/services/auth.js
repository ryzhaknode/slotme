import bcrypt from 'bcrypt';
import prisma from '../../prisma/prisma.js';
import createHttpError from 'http-errors';
import { normalizeEmail } from '../utils/normalizeEmail.js';
import { createSession } from '../utils/createSession.js';
import { parseToken } from '../utils/parseToken.js';
import crypto from 'crypto';

// removed unused register/login flows; using code-based auth

export const logoutUser = async (accessToken) => {
  const session = await prisma.session.findUnique({
    where: { accessToken: accessToken },
  });

  if (!session) {
    throw createHttpError(404, 'Session not found');
  }

  await prisma.session.delete({ where: { id: session.id } });
};

export const refreshUsersSession = async ({ refreshToken }) => {
  if (!refreshToken) {
    throw createHttpError(400, 'Refresh token is required');
  }

  const { id } = parseToken(refreshToken, 'refresh');

  const existingUser = await prisma.user.findUnique({
    where: { id: id },
  });

  const session = await prisma.session.findUnique({
    where: {
      userId: id,
      refreshToken,
    },
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired = new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession(id);

  await prisma.session.deleteMany({ where: { userId: id, refreshToken } });

  const newCreatedSession = await prisma.session.create({
    data: { ...newSession },
  });

  return {
    user: {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    },
    newSession: newCreatedSession,
  };
};

export const createOrReuseVerificationCode = async (email) => {
  const normalizedEmail = normalizeEmail(email);

  const existing = await prisma.verificationCode.findFirst({
    where: {
      email: normalizedEmail,
      consumed: false,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: 'desc' },
  });

  if (existing) return existing;

  const code = (Math.floor(100000 + Math.random() * 900000)).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  return prisma.verificationCode.create({
    data: {
      email: normalizedEmail,
      code,
      expiresAt,
    },
  });
};

export const verifyEmailCodeAndLogin = async ({ email, code }) => {
  const normalizedEmail = normalizeEmail(email);

  const record = await prisma.verificationCode.findFirst({
    where: {
      email: normalizedEmail,
      code,
      consumed: false,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: 'desc' },
  });

  if (!record) {
    throw createHttpError(400, 'Invalid or expired code');
  }

  await prisma.verificationCode.update({
    where: { id: record.id },
    data: { consumed: true },
  });

  let user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        name: normalizedEmail.split('@')[0],
        password: await bcrypt.hash(crypto.randomBytes(16).toString('hex'), 10),
      },
    });
  }

  await prisma.session.deleteMany({ where: { userId: user.id } });
  const newSession = createSession(user.id);
  const session = await prisma.session.create({ data: { ...newSession } });

  return {
    user: { id: user.id, name: user.name, email: user.email },
    session,
  };
};
