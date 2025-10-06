import { getIo } from '../../socket/index.js';
import { loginUser, logoutUser, refreshUsersSession, registerUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  const { session } = await loginUser(req.body);

  const { id, name, email } = user;

  const data = {
    id,
    name,
    email,
  };

  const io = getIo();
  io.emit('newUser', { message: 'A new user has registered!', data });

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      data,
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
    },
  });
};

export const loginUserController = async (req, res) => {
  const { user, session } = await loginUser(req.body);

  const { id, name, email } = user;

  const data = {
    id,
    name,
    email,
  };

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      data,
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
    },
  });
};

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
