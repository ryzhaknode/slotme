import { MdAdd } from 'react-icons/md';

interface IProps {
  messageText: string;
  onMessageChange: (value: string) => void;
  onSend: () => void;
  onFileButtonClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function MessageInputBox({
  messageText,
  onMessageChange,
  onSend,
  onFileButtonClick,
  fileInputRef,
  onFileChange,
}: IProps) {
  return (
    <div className="mt-4 flex items-center gap-3 border-t border-gray-300 pt-4">
      <button
        type="button"
        onClick={onFileButtonClick}
        aria-label="Add file"
        className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-200 transition"
      >
        <MdAdd size={24} />
      </button>

      <input type="file" multiple ref={fileInputRef} onChange={onFileChange} className="hidden" />

      <input
        type="text"
        className="flex-1 rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
        placeholder="Type your message..."
        value={messageText}
        onChange={(e) => onMessageChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
      />

      <button
        type="button"
        onClick={onSend}
        className="bg-green-500 hover:bg-green-600 text-sm text-white font-semibold rounded-lg px-5 py-3 transition"
      >
        SEND
      </button>
    </div>
  );
}
