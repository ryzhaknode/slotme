// import toast from 'react-hot-toast';
import { FormProvider, useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import { useDispatch } from 'react-redux';

// import { logIn, register } from '../../redux/auth/operations';
import { signUpSchema, singInSchema } from '../../utils/validationSchemas';
import type { IAuthFormValues } from '../../types/authTypes';

import InputField from '../InputField/InputField';
import FormButton from '../FormButton/FormButton';

type Props = {
  type: 'login' | 'register';
  title: string;
};

export default function AuthForm({ type, title }: Props) {
  // const dispatch = useDispatch();

  const methods = useForm<IAuthFormValues>({
    resolver: yupResolver(type === 'register' ? signUpSchema : singInSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<IAuthFormValues> = (userData) => {
    // const action = type === 'register' ? register(userData) : logIn(userData);
    // dispatch(action)
    //   .unwrap()
    //   .then(() => {
    //     methods.reset();
    //   })
    //   .catch((error: { message: string }) => {
    //     toast.error(error.message);
    //   });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6 mb-6 pt-[34px]">
          {type === 'register' && <InputField name="name" placeholder="Name *" />}
          <InputField name="email" type="email" placeholder="Email *" />
          <InputField name="password" type="password" placeholder="Password *" />
        </div>
        <div className="flex justify-end">
          <FormButton>{title.toUpperCase()}</FormButton>
        </div>
      </form>
    </FormProvider>
  );
}
