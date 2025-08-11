import { MdOutlineSimCardDownload } from 'react-icons/md';
import type { IMessage } from '../../types/messageTypes';

interface IProps {
  messages: IMessage[];
  currentUserId: string | null;
}

export default function MessagesContainer({ messages, currentUserId }: IProps) {
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
        const isCurrentUser = message.sender.id === currentUserId;
        return (
          <div
            key={message.id}
            className={`max-w-[70%] p-3 rounded-xl shadow break-words ${
              isCurrentUser
                ? 'bg-green-100 self-end text-right text-gray-900'
                : 'bg-white self-start text-left text-gray-800'
            }`}
          >
            {message.files && message.files.length > 0 && (
              <div
                className={`${
                  isCurrentUser ? 'mb-1 flex flex-wrap gap-2 justify-end' : 'mb-1 flex flex-wrap gap-2 justify-start'
                }`}
              >
                {message.files.map((file) => {
                  const isImage = file.url.match(/\.(jpeg|jpg|png|gif|webp)$/i);

                  if (isImage) {
                    return (
                      <img
                        key={file.id}
                        src={file.url}
                        alt="attached file"
                        className="max-w-[240px] max-h-[240px] rounded-md object-cover cursor-pointer"
                        onClick={() => window.open(file.url, '_blank')}
                      />
                    );
                  }

                  return (
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

            <p className="mb-1 whitespace-pre-wrap">{message.text}</p>

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
