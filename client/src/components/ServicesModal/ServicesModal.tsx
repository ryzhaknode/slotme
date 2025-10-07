import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
import CloseButton from '../CloseButton/CloseButton';

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle?: string;
  serviceDescription?: string;
  onBookService?: (serviceName?: string) => void;
}

export default function ServicesModal({ isOpen, onClose, serviceTitle, serviceDescription, onBookService }: ServicesModalProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <div className="relative h-full w-full flex flex-col pb-5">
          {/* Close Button - Top Right */}
          <div className="absolute top-0 right-4 z-10">
            <CloseButton onClick={onClose} size="xs" animation="from-right" />
          </div>
          
          {/* Fixed Header */}
          <div className="w-full bg-white border-b border-gray-200 flex-shrink-0">
            <DrawerHeader>
              <DrawerTitle className="text-xl font-semibold text-gray-800">
                {serviceTitle || 'Послуга'}
              </DrawerTitle>
              <DrawerDescription className="sr-only">
                Опис послуги
              </DrawerDescription>
            </DrawerHeader>
          </div>

          {/* Scrollable Content */}
          <div className="w-full flex-1 bg-white px-6 overflow-y-auto">
            {/* Content */}
            <div className="pt-4">
              <p className="text-gray-600">{serviceDescription || 'Опис послуги...'}</p>
            </div>

            {/* Price Block */}
            <div className="mt-4 p-2 min-h-[50px] bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Вартість:</span>
                <span className="text-xl font-bold text-gray-800">500</span>
                <span className="text-lg text-gray-600">₴</span>
              </div>
            </div>

            {/* Book Button */}
            <div className="mt-2">
              <button
                onClick={() => {
                  if (onBookService) {
                    onBookService(serviceTitle);
                  }
                  onClose();
                }}
                className="w-full bg-orange text-black font-semibold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Записатись
              </button>
            </div>
            
            {/* Bottom padding for better scroll */}
            <div className="pb-6"></div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}