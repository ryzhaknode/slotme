import { MdWhatsapp } from 'react-icons/md';

export default function HomePage() {
  return (
    <div className="min-w-[360px] max-w-[1046px] mx-auto px-[15px] mt-[120px]">
      <div className="bg-white p-[36px] rounded-[28px]">
        <div className="flex items-center gap-3 pt-[34px] mb-[12px]">
          <MdWhatsapp size={44} className="text-green-500" />
          <h1 className="text-4xl text-[40px]">Real Time Chat</h1>
        </div>
        <p className="mb-[28px]">Welcome to Real Time Chat — fast, secure, and truly live conversations.</p>
      </div>
    </div>
  );
}
