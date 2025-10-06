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
      className="w-40 h-12 py-2 px-4 text-sm font-semibold rounded-lg transition-colors duration-200  bg-green-500 text-white hover:bg-green-600"
    >
      {children}
    </button>
  );
}
