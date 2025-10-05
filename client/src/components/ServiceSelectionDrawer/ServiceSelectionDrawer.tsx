import { useState } from 'react';
import { useServices } from '../../hooks/useServices';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from '@/components/ui/drawer';
import CloseButton from '../CloseButton/CloseButton';

interface ServiceSelectionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onServiceSelect: (serviceName: string) => void;
}

export default function ServiceSelectionDrawer({ 
  isOpen, 
  onClose, 
  onServiceSelect 
}: ServiceSelectionDrawerProps) {
  const { data: services = [], isLoading: loading, error } = useServices();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleServiceSelect = (serviceName: string) => {
    setSelectedService(serviceName);
  };

  const handleConfirm = () => {
    if (selectedService) {
      onServiceSelect(selectedService);
      onClose();
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="pb-4">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl font-semibold">
              Оберіть послугу
            </DrawerTitle>
            <DrawerClose asChild>
              <CloseButton 
                onClick={onClose} 
                size="xs" 
                animation="from-right"
              />
            </DrawerClose>
          </div>
          <DrawerDescription className="text-gray-600 text-sm">
            Виберіть послугу для запису
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 pb-4">
          {/* Services Grid */}
          <div className="grid grid-cols-1 gap-3 mb-6">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-gray-500">Завантаження послуг...</div>
              </div>
            ) : (
              services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service.name)}
                  className={`
                    h-16 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-between
                    ${selectedService === service.name
                      ? 'bg-orange text-white'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }
                  `}
                >
                  <div className="text-left">
                    <div className="font-semibold text-base">
                      {service.name}
                    </div>
                    <div className="text-sm opacity-80">
                      {service.duration || service.description}
                    </div>
                  </div>
                  {selectedService === service.name && (
                    <div className="text-white">✓</div>
                  )}
                </button>
              ))
            )}
          </div>

          {/* Selected Service Info */}
          {selectedService && (
            <div className="text-center mb-4">
              <p className="text-gray-600">
                Обрана послуга: {selectedService}
              </p>
            </div>
          )}

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            disabled={!selectedService}
            className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors ${
              selectedService 
                ? 'bg-orange text-black hover:bg-orange-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Підтвердити
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
