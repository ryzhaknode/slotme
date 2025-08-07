import AppBar from '../AppBar/AppBar';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="min-w-[360px] w-full mx-auto">
      <AppBar />
      <main className="pt-[120px] pb-[120px]">{children}</main>
    </div>
  );
}
