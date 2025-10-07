import { useCallback, useEffect, useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from '@/components/ui/drawer';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';
import CloseButton from '../CloseButton/CloseButton';
import ServiceSelectionDrawer from '../ServiceSelectionDrawer/ServiceSelectionDrawer';
import { useTimeSlots, useBookTimeSlot } from '../../hooks/useTimeSlots';
import { useAuthStore } from '@/store/auth';
import AuthForm from '../AuthForm/AuthForm';
import { useServices } from '@/hooks/useServices';

interface TimeSlotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  selectedService?: string;
  onTimeSelect: (time: string) => void;
  onSuccess?: () => void;
  onServiceSelect?: (serviceName: string) => void;
}

export default function TimeSlotDrawer({ 
  isOpen, 
  onClose, 
  selectedDate, 
  selectedService = "Консультація",
  onTimeSelect,
  onSuccess,
  onServiceSelect
}: TimeSlotDrawerProps) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isServiceDrawerOpen, setIsServiceDrawerOpen] = useState(false);
  const [overrideServiceName, setOverrideServiceName] = useState<string | null>(null);
  const [isAuthDrawerOpen, setIsAuthDrawerOpen] = useState(false);
  const [authStep, setAuthStep] = useState<'email' | 'code' | 'password'>('email');
  const [shouldBookAfterAuth, setShouldBookAfterAuth] = useState(false);
  const { toast } = useToast();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const user = useAuthStore((s) => s.user);

  // Получаем слоты с сервера (локальна дата YYYY-MM-DD, без UTC зсуву)
  const dateString = selectedDate
    ? [
        selectedDate.getFullYear(),
        String(selectedDate.getMonth() + 1).padStart(2, '0'),
        String(selectedDate.getDate()).padStart(2, '0'),
      ].join('-')
    : '';
  const { data: timeSlotsData = [], isLoading, error } = useTimeSlots(dateString);
  const bookTimeSlotMutation = useBookTimeSlot();
  const { data: servicesList = [] } = useServices();

  // Преобразуем данные с сервера в нужный формат
  const timeSlots = timeSlotsData.map(slot => ({
    value: slot.startTime,
    end: slot.endTime,
    display: `${slot.startTime} - ${slot.endTime}`,
    isAvailable: slot.isAvailable
  }));

  const isOccupied = (time: string) => {
    const slot = timeSlots.find(s => s.value === time);
    return slot ? !slot.isAvailable : true;
  };

  const handleTimeSelect = (time: string) => {
    if (!isOccupied(time) && !isPastTime(time)) {
      setSelectedTime(time);
    }
  };

  const isSelectedDateToday = (() => {
    if (!selectedDate) return false;
    return new Date().toDateString() === selectedDate.toDateString();
  })();

  const isPastTime = (time: string): boolean => {
    if (!isSelectedDateToday) return false;
    if (!selectedDate) return false;
    const [startH, startM] = time.split(':').map((n) => parseInt(n, 10));
    if (Number.isNaN(startH)) return false;
    const startDate = new Date(selectedDate);
    startDate.setHours(startH, startM || 0, 0, 0);
    const now = new Date();
    return now >= startDate;
  };

  const resolveServiceId = useCallback(() => {
    const effectiveName = overrideServiceName || selectedService;
    if (!effectiveName) return null;
    const match = (servicesList as Array<{ id: string; name: string }>).find((s) => s.name === effectiveName);
    return match ? match.id : null;
  }, [selectedService, overrideServiceName, servicesList]);

  const performBooking = useCallback(async () => {
    if (!selectedTime || !selectedDate) return;
    const serviceId = resolveServiceId();
    if (!serviceId) {
      setIsServiceDrawerOpen(true);
      return;
    }
    const userId = user?.id;
    if (!userId) {
      setIsAuthDrawerOpen(true);
      setShouldBookAfterAuth(true);
      return;
    }
    try {
      const bookingData = {
        slotId: `${dateString}-${selectedTime}`,
        serviceId,
        userId,
        date: dateString
      };
      await bookTimeSlotMutation.mutateAsync(bookingData);
      const timeRange = timeSlots.find(slot => slot.value === selectedTime)?.display;
      toast({
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span>Успішний запис!</span>
          </div>
        ) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        description: `Ви успішно записали на ${selectedDate?.toLocaleDateString('uk-UA')} о ${timeRange} на послугу "${selectedService}"`,
        variant: "default",
      });
      onTimeSelect(selectedTime);
      onClose();
      if (onSuccess) {
        onSuccess();
      }
    } catch {
      toast({
        title: "Помилка бронювання",
        description: "Не вдалося забронювати слот. Спробуйте ще раз.",
        variant: "destructive",
      });
    }
  // Dependencies: booking details and callbacks
  }, [
    selectedTime,
    selectedDate,
    selectedService,
    resolveServiceId,
    user?.id,
    dateString,
    timeSlots,
    toast,
    onTimeSelect,
    onClose,
    onSuccess,
    bookTimeSlotMutation,
  ]);

  const handleConfirm = async () => {
    if (selectedTime && selectedDate) {
      // Проверяем, выбрана ли услуга
      if (!selectedService || selectedService === "Консультація") {
        // Если услуга не выбрана, показываем drawer выбора услуги
        setIsServiceDrawerOpen(true);
        return;
      }
      await performBooking();
    }
  };

  useEffect(() => {
    if (isAuthDrawerOpen && isLoggedIn && shouldBookAfterAuth) {
      setShouldBookAfterAuth(false);
      setIsAuthDrawerOpen(false);
      setAuthStep('email');
      // After successful auth, proceed with booking
      performBooking();
    }
  }, [isAuthDrawerOpen, isLoggedIn, shouldBookAfterAuth, performBooking]);

  const handleServiceSelection = (serviceName: string) => {
    if (onServiceSelect) {
      onServiceSelect(serviceName);
    }
    setOverrideServiceName(serviceName);
    setIsServiceDrawerOpen(false);
    
    // Після вибору послуги виконуємо реальне бронювання
    performBooking();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('uk-UA', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[90vh] flex flex-col">
        <DrawerHeader className="pb-4 shrink-0">
          <div className="flex items-start justify-end">
            <DrawerClose asChild>
              <CloseButton 
                onClick={onClose} 
                size="xs" 
                animation="from-right"
              />
            </DrawerClose>
          </div>
          <div className="flex items-center justify-center mt-2">
            <DrawerTitle className="text-xl font-semibold text-center">
              Оберіть час
            </DrawerTitle>
          </div>
          {selectedDate && (
            <DrawerDescription className="text-gray-600 text-sm">
              {formatDate(selectedDate)}
            </DrawerDescription>
          )}
        </DrawerHeader>

        <div className="px-4 pb-4 flex-1 overflow-y-auto">
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="text-gray-500">Завантаження слотів...</div>
            </div>
          )}
          
          {/* Error State */}
          {error && (
            <div className="flex justify-center items-center py-8">
              <div className="text-red-500">Помилка завантаження слотів</div>
            </div>
          )}
          
          {/* Time Slots Grid */}
          {!isLoading && !error && (
            <div className="grid grid-cols-3 gap-3 mb-6">
              {timeSlots.map((slot) => (
              <button
                key={slot.value}
                onClick={() => handleTimeSelect(slot.value)}
                disabled={isOccupied(slot.value) || isPastTime(slot.value)}
                className={`
                  h-16 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center
                  ${isOccupied(slot.value) || isPastTime(slot.value)
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : selectedTime === slot.value
                    ? 'bg-orange text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }
                `}
              >
                {slot.display}
              </button>
            ))}
            </div>
          )}

          {/* Selected Time Info */}
          {selectedTime && (
            <div className="text-center mb-4">
              <p className="text-gray-600">
                Обраний час: {timeSlots.find(slot => slot.value === selectedTime)?.display}
              </p>
            </div>
          )}

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            disabled={!selectedTime || bookTimeSlotMutation.isPending}
            className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors ${
              selectedTime && !bookTimeSlotMutation.isPending
                ? 'bg-orange text-black hover:bg-orange-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {bookTimeSlotMutation.isPending ? 'Бронювання...' : 'Підтвердити'}
          </button>
      </div>

      {/* Service Selection Drawer */}
      <ServiceSelectionDrawer
        isOpen={isServiceDrawerOpen}
        onClose={() => setIsServiceDrawerOpen(false)}
        onServiceSelect={handleServiceSelection}
      />

      {/* Auth Drawer for unauthenticated users */}
      <Drawer open={isAuthDrawerOpen} onOpenChange={(open) => { setIsAuthDrawerOpen(open); if (!open) setAuthStep('email'); }}>
        <DrawerContent className="h-[90vh] flex flex-col">
          <DrawerHeader className="pb-4 shrink-0">
            <div className="flex items-start justify-end">
              <DrawerClose asChild>
                <CloseButton 
                  onClick={() => { setIsAuthDrawerOpen(false); setShouldBookAfterAuth(false); setAuthStep('email'); }} 
                  size="sm" 
                  animation="from-right"
                />
              </DrawerClose>
            </div>
            {authStep !== 'code' && (
              <>
                <div className="flex items-center justify-center mt-2">
                  <DrawerTitle className="text-xl font-semibold text-center">
                    Увійдіть, щоб підтвердити запис
                  </DrawerTitle>
                </div>
                <DrawerDescription className="text-gray-600 text-sm">
                  Введіть email, отримайте код та підтвердіть його.
                </DrawerDescription>
              </>
            )}
          </DrawerHeader>

          <div className="px-4 pb-10 flex-1 overflow-y-auto">
            <div className="relative">
              <AuthForm
                type="login"
                hideHeader
                suppressSuccessToast
                onStepChange={(s) => setAuthStep(s)}
              />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </DrawerContent>
  </Drawer>
);
}
