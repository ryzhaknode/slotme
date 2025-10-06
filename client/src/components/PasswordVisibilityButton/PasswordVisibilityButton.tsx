import { FiEye, FiEyeOff } from 'react-icons/fi';

type Props = {
  onClick: () => void;
  visible: boolean;
};

export default function PasswordVisibilityButton({ onClick, visible }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
    >
      {visible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
    </button>
  );
}
