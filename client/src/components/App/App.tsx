import toast, { Toaster } from 'react-hot-toast';
import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { selectIsRefreshing } from '../../redux/auth/selectors';
import { refreshUser } from '../../redux/auth/operations';
import { finishAuthProcess } from '../../redux/auth/slice';

import Layout from '../Layout/Layout';
import RestrictedRoute from '../RestrictedRoute';
import PrivateRoute from '../PrivateRoute';
import CustomLoader from '../CustomLoader/CustomLoader';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const RegisterPage = lazy(() => import('../../pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));
const ChatPage = lazy(() => import('../../pages/ChatPage/ChatPage'));

export default function App() {
  const dispatch = useAppDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const refreshToken = useSelector((state: any) => state.auth.refreshToken);

  useEffect(() => {
    // Вызываем refreshUser только если есть refreshToken
    if (refreshToken) {
      dispatch(refreshUser())
        .unwrap()
        .finally(() => {
          dispatch(finishAuthProcess());
        });
    } else {
      // Если нет refreshToken, сразу завершаем процесс аутентификации
      dispatch(finishAuthProcess());
    }
  }, [dispatch, refreshToken]);

  return isRefreshing ? (
    <CustomLoader />
  ) : (
    <Layout>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RestrictedRoute component={<RegisterPage />} redirectTo="/" />} />
          <Route path="/login" element={<RestrictedRoute component={<LoginPage />} redirectTo="/chat" />} />
          <Route path="/chat" element={<PrivateRoute component={<ChatPage />} redirectTo="/login" />} />
        </Routes>
      </Suspense>
      <Toaster position="top-right" />
    </Layout>
  );
}
