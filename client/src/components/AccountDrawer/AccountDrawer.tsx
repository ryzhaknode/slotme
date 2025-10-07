import { useEffect, useState } from 'react';
import { X, User } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { useMyBookings } from '@/hooks/useTimeSlots';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AccountDrawer({ open, onClose }: Props) {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const fetchMe = useAuthStore((s) => s.fetchMe);
  const updateMe = useAuthStore((s) => s.updateMe);
  const [activeTab, setActiveTab] = useState<'data' | 'bookings'>('data');
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState<string>(user?.name || '');
  const [lastName, setLastName] = useState<string>(user?.lastName || '');
  const [age, setAge] = useState<string>(user?.age ? String(user.age) : '');
  const email = user?.email || '';
  const { data: myBookings = [], refetch: refetchMyBookings } = useMyBookings() as { data: Array<{ id: string; date: string; startTime: string; endTime: string; service: { id: string; name: string } }>; refetch: () => void };

  useEffect(() => {
    if (open) {
      refetchMyBookings();
    }
  }, [open, refetchMyBookings]);

  useEffect(() => {
    if (open && activeTab === 'bookings') {
      refetchMyBookings();
    }
  }, [open, activeTab, refetchMyBookings]);

  const handleLogout = () => {
    logout().finally(onClose);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-300">
      <div className=" right-0 top-0 h-full w-full bg-white shadow-2xl animate-in slide-in-from-right duration-300 relative flex flex-col">
        {/* Header with close button */}
        <div className="p-6 border-b border-gray-200 shrink-0">
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
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Signed-in info */}
          <div className="text-gray-700">
            {email ? `Ви увійшли як ${email}` : 'Ви увійшли'}
          </div>

          {/* Tabs like on homepage */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('data')}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                activeTab === 'data'
                  ? 'bg-orange text-black'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Мої дані
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('bookings')}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                activeTab === 'bookings'
                  ? 'bg-orange text-black'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Мої записи
            </button>
          </div>

          {/* Tab content */}
          {activeTab === 'data' ? (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Імʼя</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange ${
                    isEditing ? 'bg-white border-gray-300' : 'bg-gray-100 border-gray-200 text-gray-600'
                  }`}
                  placeholder="Ваше імʼя"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Прізвище</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange ${
                    isEditing ? 'bg-white border-gray-300' : 'bg-gray-100 border-gray-200 text-gray-600'
                  }`}
                  placeholder="Ваше прізвище"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Вік</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange ${
                    isEditing ? 'bg-white border-gray-300' : 'bg-gray-100 border-gray-200 text-gray-600'
                  }`}
                  placeholder="Ваш вік"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-4 py-3 rounded-lg border bg-gray-100 border-gray-200 text-gray-600"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex-1 py-3 rounded-lg font-semibold transition-colors bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                >
                  {isEditing ? 'Скасувати' : 'Редагувати'}
                </button>
                <button
                  type="button"
                  disabled={!isEditing}
                  onClick={async () => {
                    if (!isEditing) return;
                    await updateMe({
                      name: firstName || undefined,
                      lastName: lastName || undefined,
                      age: age ? Number(age) : undefined,
                    });
                    await fetchMe();
                    setIsEditing(false);
                  }}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                    isEditing ? 'bg-orange text-black hover:bg-orange-600' : 'bg-gray-300 text-gray-500'
                  }`}
                >
                  Зберегти
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {myBookings.length === 0 ? (
                <div className="text-center text-gray-500">Наразі немає записів</div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(
                    myBookings.reduce<Record<string, typeof myBookings>>((acc, item) => {
                      const day = new Date(item.date).toLocaleDateString('uk-UA');
                      acc[day] = acc[day] || [];
                      acc[day].push(item);
                      return acc;
                    }, {})
                  ).map(([day, bookings]) => (
                    <div key={day}>
                      <div className="text-sm text-gray-500 mb-2">{day}</div>
                      <div className="space-y-2">
                        {bookings.map((b) => (
                          <div key={b.id} className="rounded-lg border border-gray-200 p-3 bg-white flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-gray-800">{b.service.name}</div>
                              <div className="text-gray-600 text-sm">{b.startTime} — {b.endTime}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Logout */}
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


