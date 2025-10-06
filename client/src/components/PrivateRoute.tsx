import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuthProcess, selectIsLoggedIn } from '../redux/auth/selectors';
import { Navigate } from 'react-router-dom';

import CustomLoader from './CustomLoader/CustomLoader';

type Props = {
  component: React.ReactNode;
  redirectTo: string;
};

export default function PrivateRoute({ component, redirectTo }: Props) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const authProcess = useSelector(selectAuthProcess);

  if (authProcess) {
    return <CustomLoader />;
  }

  return isLoggedIn ? component : <Navigate to={redirectTo} />;
}
