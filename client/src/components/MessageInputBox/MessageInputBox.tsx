import { MdAdd, MdClose } from 'react-icons/md';

interface IProps {
  messageText: string;
  onMessageChange: (value: string) => void;
  onSend: () => void;
  onFileButtonClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFiles?: File[];
  onRemoveFile?: (index: number) => void;
}

export default function MessageInputBox({
  messageText,
  onMessageChange,
  onSend,
  onFileButtonClick,
  fileInputRef,
  onFileChange,
  selectedFiles = [],
  onRemoveFile,
}: IProps) {
  return (
    <div className="mt-4 border-t border-gray-300 pt-4 flex flex-col gap-2">
      {selectedFiles.length > 0 && (
        <div className="flex gap-3 overflow-x-auto">
          {selectedFiles.map((file, index) => {
            const isImage = file.type.startsWith('image/');
            return (
              <div key={index} className="relative w-16 h-16 rounded-md border border-gray-300 p-1 flex-shrink-0">
                {isImage ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-full object-cover rounded-md"
                    onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-md text-xs text-gray-600 text-center px-1">
                    {file.name}
                  </div>
                )}
                {onRemoveFile && (
                  <button
                    type="button"
                    onClick={() => onRemoveFile(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                    aria-label="Remove file"
                  >
                    <MdClose size={14} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onFileButtonClick}
          aria-label="Add file"
          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-200 transition flex-shrink-0"
        >
          <MdAdd size={24} />
        </button>

        <input type="file" multiple ref={fileInputRef} onChange={onFileChange} className="hidden" />

        <input
          type="text"
          className="flex-grow rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
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
          className="bg-green-500 hover:bg-green-600 text-sm text-white font-semibold rounded-lg px-5 py-3 transition flex-shrink-0"
        >
          SEND
        </button>
      </div>
    </div>
  );
}
