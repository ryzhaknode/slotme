import { getAllUsers, getCurrentUser, updateCurrentUser } from '../services/user.js';

export const getContactsController = async (req, res) => {
  const currentUserId = req.user.id;

  const users = await getAllUsers(currentUserId);

  res.status(200).json({
    status: 200,
    message: 'Contacts fetched successfully',
    data: users,
  });
};

export const getMeController = async (req, res) => {
  const currentUserId = req.user.id;
  const me = await getCurrentUser(currentUserId);
  res.status(200).json({ status: 200, message: 'Profile fetched', data: me });
};

export const updateMeController = async (req, res) => {
  const currentUserId = req.user.id;
  const { name, lastName, age } = req.body;
  const updated = await updateCurrentUser(currentUserId, {
    ...(name !== undefined ? { name } : {}),
    ...(lastName !== undefined ? { lastName } : {}),
    ...(age !== undefined ? { age: Number(age) } : {}),
  });
  res.status(200).json({ status: 200, message: 'Profile updated', data: updated });
};
