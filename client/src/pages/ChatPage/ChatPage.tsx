import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { fetchAllUsers } from '../../redux/contacts/operation';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../redux/contacts/selectors';
import { createChat } from '../../redux/chat/operation';
import { selectChat } from '../../redux/chat/selectors';
import type { IUser } from '../../types/authTypes';

import ContactsSidebar from '../../components/ContactsSidebar/ContactsSidebar';

export default function ChatPage() {
  const dispatch = useAppDispatch();
  const contacts = useSelector(selectUsers);
  const { otherUserId } = useSelector(selectChat);

  useEffect(() => {
    dispatch(fetchAllUsers())
      .unwrap()
      .catch((error: { message: string }) => {
        toast.error(error.message);
      });
  }, [dispatch]);

  const handleSelectContact = (contact: IUser) => {
    const data = {
      otherUserId: contact.id,
    };
    dispatch(createChat(data))
      .unwrap()
      .then(() => {
        // після успішного отримання chat id робимо запит на messages чату за його id
      })
      .catch((error: { message: string }) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-w-[360px] max-w-[1046px] mx-auto px-[15px]">
      <div className="bg-white p-[36px] rounded-[28px] flex gap-6">
        <ContactsSidebar contacts={contacts} onSelectContact={handleSelectContact} selectedUserId={otherUserId} />
        <div className="flex-1">
          <h2 className="text-3xl text-[40px] mb-[12px]">Real Time Chat</h2>
          <div className="bg-gray-50 h-[500px] rounded-[20px] p-4 flex items-center justify-center text-gray-400">
            Select a contact to start chatting
          </div>
        </div>
      </div>
    </div>
  );
}
