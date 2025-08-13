import { useEffect, useRef } from 'react';

interface IProps {
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export default function MessageDropdown({ onEdit, onDelete, onClose }: IProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, [onClose]);

  return (
    <div ref={dropdownRef} className="absolute left-0 mt-2 w-28 bg-white border border-gray-300 rounded shadow-md z-10">
      <button
        onClick={() => {
          onEdit();
          onClose();
        }}
        className="block w-full text-left px-3 py-2 hover:bg-gray-100"
      >
        Edit
      </button>
      <button
        onClick={() => {
          onDelete();
          onClose();
        }}
        className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-red-600"
      >
        Delete
      </button>
    </div>
  );
}
