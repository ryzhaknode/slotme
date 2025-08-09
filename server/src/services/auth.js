import bcrypt from 'bcrypt';
import prisma from '../../prisma/prisma.js';
import createHttpError from 'http-errors';
import { normalizeEmail } from '../utils/normalizeEmail.js';
import { createSession } from '../utils/createSession.js';
import { parseToken } from '../utils/parseToken.js';

export const registerUser = async (payload) => {
  const normalizedEmail = normalizeEmail(payload.email);

  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingUser) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await prisma.user.create({
    data: {
      ...payload,
      email: normalizedEmail,
      password: encryptedPassword,
    },
  });
};

export const loginUser = async (payload) => {
  const normalizedEmail = normalizeEmail(payload.email);

  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!existingUser) {
    throw createHttpError(404, 'User not found');
  }

  const isEqual = await bcrypt.compare(payload.password, existingUser.password);

  if (!isEqual) {
    throw createHttpError(401, 'Invalid email or password');
  }

  await prisma.session.deleteMany({
    where: { userId: existingUser.id },
  });

  const newSession = createSession(existingUser.id);

  const session = await prisma.session.create({
    data: { ...newSession },
  });

  return {
    user: {
      name: existingUser.name,
      email: existingUser.email,
    },
    session,
  };
};

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
      name: existingUser.name,
      email: existingUser.email,
    },
    newSession: newCreatedSession,
  };
};
