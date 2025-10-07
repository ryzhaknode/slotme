import { Toaster } from '@/components/ui/toaster';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <div className="min-w-[300px] w-full mx-auto">
        <main className="pb-[30px]">{children}</main>
      </div>
      <Toaster />
    </>
  );
}
