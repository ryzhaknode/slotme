import { useState } from 'react';
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
  const { toast } = useToast();

  // Получаем слоты с сервера
  const dateString = selectedDate ? selectedDate.toISOString().split('T')[0] : '';
  const { data: timeSlotsData = [], isLoading, error } = useTimeSlots(dateString);
  const bookTimeSlotMutation = useBookTimeSlot();

  // Преобразуем данные с сервера в нужный формат
  const timeSlots = timeSlotsData.map(slot => ({
    value: slot.startTime,
    display: `${slot.startTime} - ${slot.endTime}`,
    isAvailable: slot.isAvailable
  }));

  const isOccupied = (time: string) => {
    const slot = timeSlots.find(s => s.value === time);
    return slot ? !slot.isAvailable : true;
  };

  const handleTimeSelect = (time: string) => {
    if (!isOccupied(time)) {
      setSelectedTime(time);
    }
  };

  const handleConfirm = async () => {
    if (selectedTime && selectedDate) {
      // Проверяем, выбрана ли услуга
      if (!selectedService || selectedService === "Консультація") {
        // Если услуга не выбрана, показываем drawer выбора услуги
        setIsServiceDrawerOpen(true);
        return;
      }
      
      try {
        // Получаем serviceId из selectedService (пока используем первый сервис)
        const serviceId = 'd17d0c85-9a6f-458d-adee-debb1dde239b'; // Jazz Funk ID
        
        // Получаем userId из auth (пока используем тестового пользователя)
        const userId = '80ebc39c-f996-4389-a612-312804c6ac6d'; // Test User ID
        
        // Бронируем слот через API
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
        
        // Вызываем callback для сброса состояния и перехода к услугам
        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        toast({
          title: "Помилка бронювання",
          description: "Не вдалося забронювати слот. Спробуйте ще раз.",
          variant: "destructive",
        });
      }
    }
  };

  const handleServiceSelection = (serviceName: string) => {
    if (onServiceSelect) {
      onServiceSelect(serviceName);
    }
    setIsServiceDrawerOpen(false);
    
    // После выбора услуги подтверждаем запись
    const timeRange = timeSlots.find(slot => slot.value === selectedTime)?.display;
    
    toast({
      title: (
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>Успішний запис!</span>
        </div>
      ) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      description: `Ви успішно записали на ${selectedDate?.toLocaleDateString('uk-UA')} о ${timeRange} на послугу "${serviceName}"`,
      variant: "default",
    });
    
    onTimeSelect(selectedTime!);
    onClose();
    
    if (onSuccess) {
      onSuccess();
    }
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
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="pb-4">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl font-semibold">
              Оберіть час
            </DrawerTitle>
            <DrawerClose asChild>
              <CloseButton 
                onClick={onClose} 
                size="xs" 
                animation="from-right"
              />
            </DrawerClose>
          </div>
          {selectedDate && (
            <DrawerDescription className="text-gray-600 text-sm">
              {formatDate(selectedDate)}
            </DrawerDescription>
          )}
        </DrawerHeader>

        <div className="px-4 pb-4">
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
                disabled={isOccupied(slot.value)}
                className={`
                  h-16 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center
                  ${isOccupied(slot.value)
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
    </DrawerContent>
  </Drawer>
);
}
