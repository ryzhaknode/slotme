import toast from 'react-hot-toast';
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
import type { IUser } from '../../types/authTypes';
import type { IMessage } from '../../types/messageTypes';

import ContactsSidebar from '../../components/ContactsSidebar/ContactsSidebar';
import MessagesContainer from '../../components/MessagesContainer/MessagesContainer';
import MessageInputBox from '../../components/MessageInputBox/MessageInputBox';

export default function ChatPage() {
  const dispatch = useAppDispatch();
  const contacts = useSelector(selectUsers);
  const { id: chatId, otherUserId } = useSelector(selectChat);
  const messages = useSelector(selectMessages);
  const user = useSelector(selectUser);

  const currentUserId = user.id;

  const [messageText, setMessageText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [editingMessage, setEditingMessage] = useState<{ id: string; text: string } | null>(null);
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
        .then(() => {
          dispatch(fetchMessagesByChatId(chatId))
            .unwrap()
            .catch((error: { message: string }) => {
              toast.error(error.message);
            });
        })
        .catch((error: { message: string }) => {
          toast.error(error.message);
        });
    } else {
      dispatch(createMessage({ chatId, formData }))
        .unwrap()
        .then(() => {
          dispatch(fetchMessagesByChatId(chatId))
            .unwrap()
            .catch((error: { message: string }) => {
              toast.error(error.message);
            });
        })
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
    dispatch(deleteMessage(messageId))
      .unwrap()
      .then(() => {
        dispatch(fetchMessagesByChatId(chatId))
          .unwrap()
          .catch((error: { message: string }) => {
            toast.error(error.message);
          });
      })
      .catch((error: { message: string }) => {
        toast.error(error.message);
      });

    setMessageText('');
    setSelectedFiles([]);
    setEditingMessage(null);
  };

  return (
    <div className="min-w-[360px] max-w-[1046px] mx-auto px-[15px]">
      <div className="bg-white p-[36px] rounded-[28px] flex gap-6">
        <ContactsSidebar contacts={contacts} onSelectContact={handleSelectContact} selectedUserId={otherUserId} />
        <div className="flex-1 flex flex-col">
          <h2 className="text-3xl text-[40px] mb-[12px]">Real Time Chat</h2>
          <MessagesContainer
            messages={messages}
            currentUserId={currentUserId}
            handleEditMessage={handleEditMessage}
            handleDeleteMessage={handleDeleteMessage}
            editingMessage={editingMessage}
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
  );
}
