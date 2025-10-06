import { getIo } from '../../socket/index.js';
import { logoutUser, refreshUsersSession, createOrReuseVerificationCode, verifyEmailCodeAndLogin } from '../services/auth.js';
import { sendMail } from '../utils/mailer.js';

// removed legacy register/login controllers

export const logoutUserController = async (req, res) => {
  const { accessToken } = req;

  await logoutUser(accessToken);

  res.status(200).json({ message: 'Logout successful' });
};

export const refreshSessionController = async (req, res) => {
  const { refreshToken } = req.body;

  const { user, newSession } = await refreshUsersSession({
    refreshToken,
  });

  const { id, name, email } = user;

  const data = {
    id,
    name,
    email,
  };

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      data,
      accessToken: newSession.accessToken,
      refreshToken: newSession.refreshToken,
    },
  });
};

export const sendLoginCodeController = async (req, res) => {
  const { email } = req.body;
  const codeRecord = await createOrReuseVerificationCode(email);

  const message = {
    to: email,
    subject: 'Ваш код для входу',
    text: `Ваш код: ${codeRecord.code}. Діє 10 хвилин.`,
  };

  const info = await sendMail(message);

  res.status(200).json({
    status: 200,
    message: 'Код відправлено',
    data: {
      previewUrl: info.previewUrl ?? null,
    },
  });
};

export const verifyLoginCodeController = async (req, res) => {
  const { email, code } = req.body;
  const { user, session } = await verifyEmailCodeAndLogin({ email, code });

  res.status(200).json({
    status: 200,
    message: 'Logged in via code',
    data: {
      data: { id: user.id, name: user.name, email: user.email },
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
    },
  });
};
