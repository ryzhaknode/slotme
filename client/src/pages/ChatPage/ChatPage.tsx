import toast from 'react-hot-toast';
import socket from '../../socket/socket';
import { MdWhatsapp } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { fetchAllUsers } from '../../redux/contacts/operation';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../redux/contacts/selectors';
import { createChat } from '../../redux/chat/operation';
import { selectChat } from '../../redux/chat/selectors';
import { createMessage, deleteMessage, editeMessage, fetchMessagesByChatId } from '../../redux/message/operation';
import { selectMessages } from '../../redux/message/selectors';
import { selectUser } from '../../redux/auth/selectors';
import { addMessage, removeMessage, updateMessage } from '../../redux/message/slice';
import { addNewUser } from '../../redux/contacts/slice';
import type { IUser } from '../../types/authTypes';
import type { IMessage } from '../../types/messageTypes';

import ContactsSidebar from '../../components/ContactsSidebar/ContactsSidebar';
import MessagesContainer from '../../components/MessagesContainer/MessagesContainer';
import MessageInputBox from '../../components/MessageInputBox/MessageInputBox';
import useModal from '../../hooks/useModal';
import ModalWindow from '../../components/ModalWindow/ModalWindow';

export default function ChatPage() {
  const dispatch = useAppDispatch();
  const contacts = useSelector(selectUsers);
  const { id: chatId, otherUserId } = useSelector(selectChat);
  const messages = useSelector(selectMessages);
  const user = useSelector(selectUser);
  const { isOpen, openModal, closeModal } = useModal();

  const currentUserId = user.id;

  const [messageText, setMessageText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [editingMessage, setEditingMessage] = useState<{ id: string; text: string } | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    dispatch(fetchAllUsers())
      .unwrap()
      .catch((error: { message: string }) => {
        toast.error(error.message);
      });
  }, [dispatch]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;

      if (target.closest('[data-send-btn="true"]')) return;

      if (textInputRef.current?.contains(target)) return;

      let el: HTMLElement | null = target;
      while (el) {
        if (el.dataset.editing === 'true') return;
        el = el.parentElement;
      }

      setMessageText('');
      setSelectedFiles([]);
      setEditingMessage(null);
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [textInputRef]);

  useEffect(() => {
    if (!chatId) return;

    // Входимо в чат з chatId
    socket.emit('joinChat', chatId);

    // Обробники повідомлень
    const handleReceiveMessage = (newMessage: IMessage) => {
      dispatch(addMessage(newMessage));
    };

    const handleUpdateMessage = (updatedMessage: IMessage) => {
      dispatch(updateMessage(updatedMessage));
    };

    const handleDeleteMessage = ({ id }: { id: string }) => {
      dispatch(removeMessage(id));
    };

    socket.on('receiveMessage', handleReceiveMessage);
    socket.on('updateMessage', handleUpdateMessage);
    socket.on('deleteMessage', handleDeleteMessage);

    // Очіщуємо підписки при розмонтуванні чи зміні чату
    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
      socket.off('updateMessage', handleUpdateMessage);
      socket.off('deleteMessage', handleDeleteMessage);
    };
  }, [chatId, dispatch]);

  useEffect(() => {
    const handleNewUser = (newUserData: { message: string; user: IUser }) => {
      toast.success(newUserData.message);
      dispatch(addNewUser(newUserData));
    };

    socket.on('newUser', handleNewUser);

    return () => {
      socket.off('newUser', handleNewUser);
    };
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

  const handleSendMessage = () => {
    if (!messageText.trim() && selectedFiles.length === 0 && !editingMessage) {
      toast.error('Cannot send empty message');
      return;
    }

    if (!chatId) {
      toast.error('No chat selected');
      return;
    }

    const formData = new FormData();
    formData.append('text', messageText);
    selectedFiles.forEach((file) => formData.append('files', file));

    if (editingMessage) {
      const messageId = editingMessage.id;
      dispatch(editeMessage({ messageId, formData }))
        .unwrap()
        .catch((error: { message: string }) => {
          toast.error(error.message);
        });
    } else {
      dispatch(createMessage({ chatId, formData }))
        .unwrap()
        .catch((error: { message: string }) => {
          toast.error(error.message);
        });
    }
    setMessageText('');
    setSelectedFiles([]);
    setEditingMessage(null);
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFiles((prev) => [...prev, ...Array.from(files)]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEditMessage = (message: IMessage) => {
    setEditingMessage({ id: message.id, text: message.text || '' });
    setMessageText(message.text || '');
    textInputRef.current?.focus?.();
  };

  const handleDeleteMessage = (messageId: string) => {
    const messageData = { messageId, chatId };
    dispatch(deleteMessage(messageData))
      .unwrap()
      .catch((error: { message: string }) => {
        toast.error(error.message);
      });

    setMessageText('');
    setSelectedFiles([]);
    setEditingMessage(null);
  };

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
    openModal('image');
  };

  return (
    <>
      <div className="min-w-[360px] max-w-[1046px] mx-auto px-[15px]">
        <div className="bg-white p-[36px] rounded-[28px] flex gap-6">
          <ContactsSidebar contacts={contacts} onSelectContact={handleSelectContact} selectedUserId={otherUserId} />
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-[12px]">
              <MdWhatsapp size={36} className="text-green-500" />
              <h2 className="text-3xl text-[32px]">Real Time Chat</h2>
            </div>
            <MessagesContainer
              messages={messages}
              currentUserId={currentUserId}
              handleEditMessage={handleEditMessage}
              handleDeleteMessage={handleDeleteMessage}
              editingMessage={editingMessage}
              onImageClick={handleImageClick}
            />
            {chatId && (
              <MessageInputBox
                messageText={messageText}
                onMessageChange={setMessageText}
                onSend={handleSendMessage}
                onFileButtonClick={handleFileButtonClick}
                fileInputRef={fileInputRef}
                textInputRef={textInputRef}
                onFileChange={handleFileChange}
                selectedFiles={selectedFiles}
                onRemoveFile={handleRemoveFile}
              />
            )}
          </div>
        </div>
      </div>
      {selectedImage && <ModalWindow isOpen={isOpen} onClose={closeModal} imageUrl={selectedImage} />}
    </>
  );
}
