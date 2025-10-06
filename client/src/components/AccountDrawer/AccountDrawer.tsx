import { X, User } from 'lucide-react';
import { useAuthStore } from '@/store/auth';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AccountDrawer({ open, onClose }: Props) {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout().finally(onClose);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-300">
      <div className=" right-0 top-0 h-full w-full bg-white shadow-2xl animate-in slide-in-from-right duration-300 relative">
        {/* Header with close button */}
        <div className="p-6 border-b border-gray-200">
          <div className="text-lg font-semibold flex items-center gap-2">
            <User size={20} />
            <span>Особистий кабінет</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Закрити"
            className="absolute top-4 right-4 bg-orange text-black hover:bg-orange-600 transition-all duration-300 rounded-lg flex items-center justify-center"
            style={{ width: '32px', height: '32px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="text-gray-700">
            {user?.email ? `Ви увійшли як ${user.email}` : 'Ви увійшли'}
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Вийти з кабінету
          </button>
        </div>
      </div>

      {/* Full-width drawer: closing by header button */}
    </div>
  );
}


