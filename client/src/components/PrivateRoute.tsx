import React from 'react';
// import { useSelector } from 'react-redux';
// import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { Navigate } from 'react-router-dom';

type Props = {
  component: React.ReactNode;
  redirectTo: string;
};

export default function PrivateRoute({ component, redirectTo }: Props) {
  //   const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoggedIn = true;

  return isLoggedIn ? component : <Navigate to={redirectTo} />;
}
