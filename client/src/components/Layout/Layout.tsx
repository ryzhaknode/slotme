import { useLocation } from 'react-router-dom';
import AppBar from '../AppBar/AppBar';
import { Toaster } from '@/components/ui/toaster';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <div className="min-w-[300px] w-full mx-auto">
        {!isHomePage && <AppBar />}
        <main className={isHomePage ? "pb-[30px]" : "pt-[100px] pb-[30px]"}>{children}</main>
      </div>
      <Toaster />
    </>
  );
}
