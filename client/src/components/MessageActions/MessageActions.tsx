import { MdDelete, MdEdit } from 'react-icons/md';

interface IProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function MessageActions({ onEdit, onDelete }: IProps) {
  return (
    <div className="absolute bottom-3 left-3 flex gap-2">
      {onEdit && (
        <button
          onClick={onEdit}
          aria-label="Edit message"
          className="text-gray-500 hover:text-gray-800 transition"
          type="button"
        >
          <MdEdit size={16} />
        </button>
      )}

      {onDelete && (
        <button
          onClick={onDelete}
          aria-label="Delete message"
          className="text-red-500 hover:text-red-800 transition"
          type="button"
        >
          <MdDelete size={16} />
        </button>
      )}
    </div>
  );
}
