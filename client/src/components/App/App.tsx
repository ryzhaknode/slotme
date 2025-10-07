import { Toaster } from 'react-hot-toast';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';

import Layout from '../Layout/Layout';
import CustomLoader from '../CustomLoader/CustomLoader';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));

export default function App() {
  const [bootRefreshing, setBootRefreshing] = useState(true);
  const refresh = useAuthStore((s) => s.refresh);
  const hydrateFromCookie = useAuthStore((s) => s.hydrateFromCookie);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const hydrated = await hydrateFromCookie();
        if (!hydrated) {
          await refresh();
        }
      } finally {
        if (mounted) setBootRefreshing(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [refresh, hydrateFromCookie]);

  return bootRefreshing ? (
    <CustomLoader />
  ) : (
    <Layout>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Suspense>
      <Toaster position="top-right" />
    </Layout>
  );
}
