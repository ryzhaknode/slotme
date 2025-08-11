import { useFormContext } from 'react-hook-form';
import { useState } from 'react';

import PasswordVisibilityButton from '../PasswordVisibilityButton/PasswordVisibilityButton';

type Props = {
  name: string;
  type?: string;
  placeholder?: string;
};

export default function InputField({ name, type = 'text', placeholder }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleClick = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const inputType = type === 'password' && isPasswordVisible ? 'text' : type;

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="flex flex-col gap-1 relative">
      <input
        id={name}
        type={inputType}
        placeholder={placeholder}
        {...register(name)}
        className="w-full h-14 px-4 py-2 rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-none"
      />

      {error && <p className="flex items-center gap-1 text-red-500 text-sm absolute right-0 top-[55px]">{error}</p>}

      {type === 'password' && (
        <div className="absolute right-[40px] top-[14px]">
          <PasswordVisibilityButton onClick={handleClick} visible={isPasswordVisible} />
        </div>
      )}
    </div>
  );
}
