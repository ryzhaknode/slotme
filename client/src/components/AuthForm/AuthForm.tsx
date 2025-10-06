import toast from 'react-hot-toast';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { emailOnlySchema } from '../../utils/validationSchemas';
import { useAuthStore } from '@/store/auth';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Eye, EyeOff, X as CloseIcon } from 'lucide-react';

import InputField from '../InputField/InputField';
import GoogleIcon from '../icons/GoogleIcon';
import AppleIcon from '../icons/AppleIcon';
import CloseButton from '../CloseButton/CloseButton';

type Props = {
  type: 'login' | 'register';
  onClose?: () => void;
};

export default function AuthForm({ type, onClose }: Props) {
  const { sendLoginCode, verifyLoginCode } = useAuthStore();
  const [step, setStep] = useState<'email' | 'code' | 'password'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const emailMethods = useForm({
    resolver: yupResolver(emailOnlySchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const showErrorToast = (message: string) =>
    toast.custom(
      <div className="flex items-start gap-3 rounded-md border border-red-200 bg-white px-4 py-3 shadow-md">
        <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-red-500">
          <CloseIcon size={14} className="text-white" />
        </div>
        <div className="text-sm text-red-700">{message}</div>
      </div>
    );

  const passwordMethods = useForm({ mode: 'onTouched', reValidateMode: 'onChange' });

  const handleEmailSubmit = (data: { email: string }) => {
    const nextEmail = data.email;
    setEmail(nextEmail);
    // Optimistic success UI: show success and go to code step immediately
    toast.success('Код надіслано на вашу електронну пошту');
    setStep('code');
    // use zustand action
    Promise.resolve(sendLoginCode(nextEmail))
      .then((resp: any) => {
        if (resp.previewUrl) window.open(resp.previewUrl, '_blank', 'noopener,noreferrer');
        emailMethods.reset();
      })
      .catch((err: any) => showErrorToast(err.message || String(err)));
  };

  const handlePasswordSubmit = () => {
    toast.error('Парольна авторизація відключена. Використайте код із пошти.');
  };

  const handleSendCode = () => {
    if (!email) {
      toast.error('Введіть email спочатку');
      return;
    }
    // Optimistic success UI on resend
    toast.success('Код повторно надіслано');
    setStep('code');
    Promise.resolve(sendLoginCode(email))
      .then((data: any) => {
        if (data.previewUrl) window.open(data.previewUrl, '_blank', 'noopener,noreferrer');
      })
      .catch((err: any) => showErrorToast(err.message || String(err)));
  };

  const handleVerifyCode = () => {
    if (!code || code.length !== 6) {
      toast.error('Введіть 6-значний код');
      return;
    }
    Promise.resolve(verifyLoginCode(email, code))
      .then(() => {
        passwordMethods.reset();
        toast.success('Ви успішно зайшли в кабінет');
      })
      .catch((error: any) => {
        showErrorToast(error.message || String(error));
      });
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

          {/* Send Code (submit email) */}
          <div className="animate-fly-in-from-top">
            <button
              type="submit"
              className="w-full bg-orange text-black font-bold py-4 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Надіслати код
            </button>
          </div>
        </form>
      </FormProvider>
    );
  }

  if (step === 'code') {
    return (
      <div>
        {onClose && (
          <div className="absolute top-4 right-4 z-10">
            <CloseButton onClick={onClose} animation="from-top" />
          </div>
        )}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-2">Введіть код</h2>
          <p className="text-gray-500 text-center">Ми надіслали код на {email}</p>
        </div>
        <div className="mb-6">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            placeholder="6-значний код"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
          />
        </div>
        <div className="animate-fly-in-from-top">
          <Button type="button" onClick={handleVerifyCode} className="w-full bg-orange text-white py-3 rounded-lg mb-6">
            Підтвердити
          </Button>
        </div>
        <div className="text-center">
          <button type="button" onClick={handleSendCode} className="text-orange hover:underline">
            Надіслати код ще раз
          </button>
        </div>
      </div>
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
          {typeof passwordMethods.formState.errors.password?.message === 'string' && (
            <p className="text-red-500 text-sm mt-1">{passwordMethods.formState.errors.password?.message}</p>
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
            aria-label="Надіслати код"
          >
            Надіслати код
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
