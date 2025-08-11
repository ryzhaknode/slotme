import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/store';
import { fetchAllUsers } from '../../redux/contacts/operation';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../redux/contacts/selectors';
import { createChat } from '../../redux/chat/operation';
import { selectChat } from '../../redux/chat/selectors';
import { fetchMessagesByChatId } from '../../redux/message/operation';
import { selectMessages } from '../../redux/message/selectors';
import { selectUser } from '../../redux/auth/selectors';
import type { IUser } from '../../types/authTypes';

import ContactsSidebar from '../../components/ContactsSidebar/ContactsSidebar';
import MessagesContainer from '../../components/MessagesContainer/MessagesContainer';

export default function ChatPage() {
  const dispatch = useAppDispatch();
  const contacts = useSelector(selectUsers);
  const { otherUserId } = useSelector(selectChat);
  const chatMessages = useSelector(selectMessages);
  const user = useSelector(selectUser);

  const currentUserId = user.id;

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
      .then((res) => {
        const chatId = res.data.id;
        dispatch(fetchMessagesByChatId(chatId))
          .unwrap()
          .catch((error: { message: string }) => {
            toast.error(error.message);
          });
      })
      .catch((error: { message: string }) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-w-[360px] max-w-[1046px] mx-auto px-[15px]">
      <div className="bg-white p-[36px] rounded-[28px] flex gap-6">
        <ContactsSidebar contacts={contacts} onSelectContact={handleSelectContact} selectedUserId={otherUserId} />
        <div className="flex-1 flex flex-col">
          <h2 className="text-3xl text-[40px] mb-[12px]">Real Time Chat</h2>
          <MessagesContainer messages={chatMessages} currentUserId={currentUserId} />
        </div>
      </div>
    </div>
  );
}
