import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TimeSlotDrawer from '../TimeSlotDrawer/TimeSlotDrawer';

interface DateMenuProps {
  selectedService?: string;
  onSuccess?: () => void;
  onServiceSelect?: (serviceName: string) => void;
}

export default function DateMenu({ selectedService = "Консультація", onSuccess, onServiceSelect }: DateMenuProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isTimeDrawerOpen, setIsTimeDrawerOpen] = useState(false);

  // Генеруємо календар на поточний місяць з 5 рядів по 7 днів
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Перший день місяця
    const firstDay = new Date(year, month, 1);
    // Останній день місяця
    const lastDay = new Date(year, month + 1, 0);
    
    // День тижня першого дня місяця (0 = неділя, 1 = понеділок, ...)
    const firstDayOfWeek = firstDay.getDay();
    // Коригуємо для українського календаря (понеділок = 0)
    const adjustedFirstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    const days = [];
    
    // Додаємо дні з попереднього місяця
    const prevMonthLastDay = new Date(year, month, 0).getDate(); // Останній день попереднього місяця
    for (let i = adjustedFirstDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      days.push(new Date(year, month - 1, day));
    }
    
    // Додаємо дні поточного місяця
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }
    
    // Додаємо дні з наступного місяця до 35 (5 рядів по 7 днів)
    const remainingDays = 35 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push(new Date(year, month + 1, day));
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  const formatDate = (date: Date) => {
    return date.getDate().toString();
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('uk-UA', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
    setSelectedDate(null);
  };

  const handleTimeSelect = () => {
    // Toast будет показан в TimeSlotDrawer
  };

  const handleOpenTimeDrawer = () => {
    if (selectedDate) {
      setIsTimeDrawerOpen(true);
    }
  };

  const handleDateSelect = (date: Date) => {
    // Можно выбрать только одну дату
    if (selectedDate && selectedDate.toDateString() === date.toDateString()) {
      // Если кликнули на уже выбранную дату - снимаем выбор
      setSelectedDate(null);
    } else {
      // Выбираем новую дату
      setSelectedDate(date);
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth() && 
           date.getFullYear() === currentDate.getFullYear();
  };


  return (
    <div className="max-w-[1046px] mx-auto px-[15px] mt-4">
      {/* Header */}
      <div className="flex items-center justify-center mb-4">
        <div className="flex-1 h-px bg-gray-300"></div>
        <h2 className="text-center text-gray-500 text-base font-medium mx-4">
          ВИБІР ДАТИ
        </h2>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* Month/Year Display with Navigation */}
      <div className="flex items-center justify-center mb-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="flex items-center justify-center w-10 h-10 bg-orange hover:bg-orange-600 text-white rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
          aria-label="Попередній місяць"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h3 className="text-xl font-semibold text-gray-800 mx-6">
          {formatMonthYear(currentDate)}
        </h3>
        <button
          onClick={() => navigateMonth('next')}
          className="flex items-center justify-center w-10 h-10 bg-orange hover:bg-orange-600 text-white rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
          aria-label="Наступний місяць"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {/* Day headers */}
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {calendarDays.map((date, index) => (
          <button
            key={index}
            onClick={() => date && handleDateSelect(date)}
            disabled={!date}
            className={`
              aspect-square flex items-center justify-center text-sm font-medium rounded-lg transition-all duration-200
              ${!date 
                ? 'bg-transparent cursor-default' 
                : isSelected(date)
                ? 'bg-orange text-white'
                : isCurrentMonth(date)
                ? `bg-white border border-gray-200 hover:bg-gray-50 ${isToday(date) ? 'text-orange-600' : 'text-gray-700'}`
                : 'bg-gray-50 text-gray-400 border border-gray-100 hover:bg-gray-100'
              }
            `}
          >
            {date ? formatDate(date) : ''}
          </button>
        ))}
      </div>

      {/* Selected Date Info */}
      <div className="text-center mb-4">
        <p className="text-gray-600">
          {selectedDate 
            ? `Вибрана дата: ${selectedDate.toLocaleDateString('uk-UA', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long' 
              })}`
            : 'Оберіть день для запису'
          }
        </p>
      </div>

      {/* Continue Button */}
      <div className="text-center">
        <button
          onClick={handleOpenTimeDrawer}
          disabled={!selectedDate}
          className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors ${
            selectedDate 
              ? 'bg-orange text-black hover:bg-orange-600' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Обрати час
        </button>
      </div>

      {/* Time Slot Drawer */}
      <TimeSlotDrawer
        isOpen={isTimeDrawerOpen}
        onClose={() => setIsTimeDrawerOpen(false)}
        selectedDate={selectedDate}
        selectedService={selectedService}
        onTimeSelect={handleTimeSelect}
        onSuccess={onSuccess}
        onServiceSelect={onServiceSelect}
      />
    </div>
  );
}
