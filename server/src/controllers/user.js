import { getAllUsers } from '../services/user.js';

export const getContactsController = async (req, res) => {
  const currentUserId = req.user.id;

  const users = await getAllUsers(currentUserId);

  res.status(200).json({
    status: 200,
    message: 'Contacts fetched successfully',
    data: users,
  });
};
