import { useState } from 'react';
import { Sparkles, Calendar } from 'lucide-react';

interface ServiceButtonsProps {
  onBookService?: () => void;
  onShowServices?: () => void;
  activeButton?: 'services' | 'booking';
}

export default function ServiceButtons({ onBookService, onShowServices, activeButton: externalActiveButton }: ServiceButtonsProps) {
  const [internalActiveButton, setInternalActiveButton] = useState<'services' | 'booking'>('services');
  
  // Використовуємо зовнішню активну кнопку, якщо передана, інакше внутрішню
  const activeButton = externalActiveButton || internalActiveButton;

  const handleServicesClick = () => {
    setInternalActiveButton('services');
    if (onShowServices) {
      onShowServices();
    }
  };

  const handleBookingClick = () => {
    setInternalActiveButton('booking');
    if (onBookService) {
      onBookService();
    }
  };

  return (
    <div className="max-w-[1046px] mx-auto px-[15px] mt-4">
      <div className="flex gap-4">
        {/* Services Button */}
        <button
          onClick={handleServicesClick}
          className={`flex-1 flex flex-col items-center justify-center px-4 rounded-2xl transition-all duration-300 ${
            activeButton === 'services'
              ? 'bg-orange text-white'
              : 'bg-white text-gray-800 border border-gray-200'
          }`}
          style={{ height: '70px' }}
        >
          <Sparkles size={16} className="mb-1" />
          <span className="text-base font-semibold">Послуги</span>
        </button>

        {/* Booking Button */}
        <button
          onClick={handleBookingClick}
          className={`flex-1 flex flex-col items-center justify-center px-4 rounded-2xl transition-all duration-300 ${
            activeButton === 'booking'
              ? 'bg-orange text-white'
              : 'bg-white text-gray-800 border border-gray-200'
          }`}
          style={{ height: '70px' }}
        >
          <Calendar size={16} className="mb-1" />
          <span className="text-base font-semibold">Записатись</span>
        </button>
      </div>
    </div>
  );
}
