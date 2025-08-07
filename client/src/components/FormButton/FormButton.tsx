type Props = {
  onClick?: () => void;
  children: string;
  type?: 'submit' | 'button';
};

export default function FormButton({ onClick, children, type = 'submit' }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-40 h-12 py-2 px-4 text-sm font-semibold rounded-full transition-colors duration-200  bg-blue-600 text-white hover:bg-blue-700"
    >
      {children}
    </button>
  );
}
