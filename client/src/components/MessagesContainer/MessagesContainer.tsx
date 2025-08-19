import { MdOutlineSimCardDownload } from 'react-icons/md';
import { MdMoreHoriz } from 'react-icons/md';
import { useState } from 'react';
import type { IMessage } from '../../types/messageTypes';

import MessageDropdown from '../MessageDropdown/MessageDropdown';

interface IProps {
  messages: IMessage[];
  currentUserId: string | null;
  handleEditMessage: (message: IMessage) => void;
  handleDeleteMessage: (messageId: string) => void;
  editingMessage: { id: string; text: string } | null;
  onImageClick: (url: string) => void;
}

export default function MessagesContainer({
  messages,
  currentUserId,
  handleEditMessage,
  handleDeleteMessage,
  editingMessage,
  onImageClick,
}: IProps) {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  if (messages.length === 0) {
    return (
      <div className="bg-gray-50 h-[500px] rounded-[20px] p-5 flex items-center justify-center text-gray-400 select-none">
        Select a contact to start chatting
      </div>
    );
  }

  return (
    <div className="bg-gray-50 h-[500px] rounded-[20px] p-5 flex flex-col overflow-y-auto space-y-3">
      {messages.map((message) => {
        const isEditing = editingMessage?.id === message.id;
        const isCurrentUser = message.senderId === currentUserId;
        const isDropdownOpen = openDropdownId === message.id;

        return (
          <div
            key={message.id}
            data-editing={isEditing ? 'true' : undefined}
            className={`relative min-w-[170px] max-w-[70%] p-3 rounded-xl shadow break-words
              ${
                isCurrentUser
                  ? 'bg-green-100 self-end text-right text-gray-900'
                  : 'bg-white self-start text-left text-gray-800'
              }
              ${isEditing ? 'shadow-[0_0_0_2px_rgba(34,197,94,0.7)]' : 'shadow'}
            `}
          >
            {isCurrentUser && (
              <div className="absolute bottom-1 left-2">
                <button
                  onClick={() => setOpenDropdownId(isDropdownOpen ? null : message.id)}
                  aria-label="Open message actions"
                  className="p-1 rounded hover:bg-gray-200 focus:outline-none"
                >
                  <MdMoreHoriz size={20} />
                </button>
                {isDropdownOpen && (
                  <MessageDropdown
                    onEdit={() => handleEditMessage(message)}
                    onDelete={() => handleDeleteMessage(message.id)}
                    onClose={() => setOpenDropdownId(null)}
                  />
                )}
              </div>
            )}

            {message.files && message.files.length > 0 && (
              <div
                className={`${
                  isCurrentUser ? 'mb-1 flex flex-wrap gap-2 justify-end' : 'mb-1 flex flex-wrap gap-2 justify-start'
                }`}
              >
                {message.files.map((file) => {
                  const isImage = file.url.match(/\.(jpeg|jpg|png|gif|webp)$/i);
                  return isImage ? (
                    <img
                      key={file.id}
                      src={file.url}
                      alt="attached file"
                      className="w-[260px] h-auto rounded-md object-cover cursor-pointer"
                      onClick={() => onImageClick(file.url)}
                    />
                  ) : (
                    <a
                      key={file.id}
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500"
                    >
                      <MdOutlineSimCardDownload size={44} />
                    </a>
                  );
                })}
              </div>
            )}

            <p className="mb-2 whitespace-pre-wrap">{message.text}</p>

            <div className="text-xs text-gray-500 select-none">
              {new Date(message.createdAt).toLocaleString(undefined, {
                dateStyle: 'short',
                timeStyle: 'short',
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
