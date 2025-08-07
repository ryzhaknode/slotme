import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from '../Layout/Layout';
import RestrictedRoute from '../RestrictedRoute';
import PrivateRoute from '../PrivateRoute';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const RegisterPage = lazy(() => import('../../pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));
const ChatPage = lazy(() => import('../../pages/ChatPage/ChatPage'));

export default function App() {
  return (
    <Layout>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RestrictedRoute component={<RegisterPage />} redirectTo="/" />} />
          <Route path="/login" element={<RestrictedRoute component={<LoginPage />} redirectTo="/chat" />} />
          <Route path="/chat" element={<PrivateRoute component={<ChatPage />} redirectTo="/login" />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
