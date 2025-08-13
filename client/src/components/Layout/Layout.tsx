import AppBar from '../AppBar/AppBar';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="min-w-[360px] w-full mx-auto">
      <AppBar />
      <main className="pt-[100px] pb-[60px]">{children}</main>
    </div>
  );
}
