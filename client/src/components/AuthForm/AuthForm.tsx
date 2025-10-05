import toast from 'react-hot-toast';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { logIn, register } from '../../redux/auth/operations';
import { singInSchema, emailOnlySchema } from '../../utils/validationSchemas';
import type { IAuthFormValues } from '../../types/authTypes';
import { useAppDispatch } from '../../redux/store';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import InputField from '../InputField/InputField';
import GoogleIcon from '../icons/GoogleIcon';
import AppleIcon from '../icons/AppleIcon';
import CloseButton from '../CloseButton/CloseButton';

type Props = {
  type: 'login' | 'register';
  onClose?: () => void;
};

export default function AuthForm({ type, onClose }: Props) {
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<'email' | 'password'>('email');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const emailMethods = useForm({
    resolver: yupResolver(emailOnlySchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const passwordMethods = useForm<IAuthFormValues>({
    resolver: yupResolver(singInSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const handleEmailSubmit = (data: { email: string }) => {
    setEmail(data.email);
    setStep('password');
    emailMethods.reset();
  };

  const handlePasswordSubmit = (data: IAuthFormValues) => {
    const userData = { ...data, email };
    const action = type === 'register' ? register(userData) : logIn(userData);
    dispatch(action)
      .unwrap()
      .then(() => {
        passwordMethods.reset();
      })
      .catch((error: { message: string }) => {
        toast.error(error.message);
      });
  };

  const handleSendCode = () => {
    toast.success('Код надіслано на вашу електронну пошту');
  };

  if (step === 'email') {
    return (
      <FormProvider {...emailMethods}>
        <form onSubmit={emailMethods.handleSubmit(handleEmailSubmit)}>
          {/* Close Button */}
          {onClose && (
            <div className="absolute top-4 right-4 z-10">
              <CloseButton onClick={onClose} animation="from-top" />
            </div>
          )}
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-center">Увійти в особистий кабінет</h1>
          </div>

          {/* Social Login Buttons */}
          <div className="flex flex-col gap-3 mb-6">
            <button
              type="button"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors bg-white"
            >
              <GoogleIcon />
              Увійти за допомогою Google
            </button>
            <button
              type="button"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors bg-white"
            >
              <AppleIcon />
              Увійти за допомогою Apple
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">АБО ВВЕДІТЬ ВАШУ ЕЛЕКТРОННУ ПОШТУ</span>
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <InputField name="email" type="email" placeholder="Ваша електронна адреса" />
          </div>

          {/* Continue Button */}
          <div className="animate-fly-in-from-top">
            <button
              type="submit"
              className="w-full bg-orange text-black font-bold py-4 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Далі
            </button>
          </div>
        </form>
      </FormProvider>
    );
  }

  return (
    <FormProvider {...passwordMethods}>
      <form onSubmit={passwordMethods.handleSubmit(handlePasswordSubmit)}>
        {/* Close Button */}
        {onClose && (
          <div className="absolute top-4 right-4 z-10">
            <CloseButton onClick={onClose} animation="from-top" />
          </div>
        )}
        
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-2">Увійти до</h2>
          <p className="text-gray-500 text-center">{email}</p>
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-3">Введіть пароль</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Пароль"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
              {...passwordMethods.register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {passwordMethods.formState.errors.password && (
            <p className="text-red-500 text-sm mt-1">{passwordMethods.formState.errors.password.message}</p>
          )}
        </div>

        {/* Authorization Button */}
        <div className="animate-fly-in-from-top">
          <Button
            type="submit"
            className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg mb-4"
            disabled
          >
            Авторизація
          </Button>
        </div>

        {/* Or separator */}
        <div className="text-center mb-4">
          <span className="text-gray-500">або</span>
        </div>

        {/* Send Code Button */}
        <div className="animate-fly-in-from-top">
          <Button
            type="button"
            onClick={handleSendCode}
            className="w-full bg-orange text-white py-3 rounded-lg mb-6"
          >
            Надішліть мені код на електронну пошту
          </Button>
        </div>

        {/* Forgot Password */}
        <div className="text-center">
          <span className="text-gray-500">Забули пароль? </span>
          <button type="button" className="text-orange hover:underline">
            Відновити
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
