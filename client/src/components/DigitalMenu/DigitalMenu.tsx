import { useState } from 'react';
import { ChevronRight, Clock, Heart } from 'lucide-react';
import { useServices } from '../../hooks/useServices';
import ServicesModal from '../ServicesModal/ServicesModal';

interface MenuItem {
  id: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

interface DigitalMenuProps {
  onBookService?: (serviceName?: string) => void;
}

export default function DigitalMenu({ onBookService }: DigitalMenuProps) {
  const { data: services = [], isLoading: loading, error } = useServices();
  
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{title: string, description: string} | null>(null);

  // Преобразуем данные из API в формат MenuItem
  const menuItems: MenuItem[] = services.map(service => ({
    id: service.id,
    title: service.name,
    subtitle: service.duration || '',
    icon: service.name === 'Хореографія' ? 
      <Heart size={16} className="text-red-500" /> : 
      <Clock size={16} className="text-gray-500" />
  }));

  const handleItemClick = (itemId: string) => {
    setSelectedItem(itemId);
    
    // Знаходимо відповідний сервіс з API
    const service = services.find(service => service.id === itemId);
    if (service) {
      setModalContent({
        title: service.name,
        description: service.description
      });
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <div className="max-w-[1046px] mx-auto px-[15px] mt-4">
      {/* Header */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex-1 h-px bg-gray-300"></div>
        <h2 className="text-center text-gray-500 text-base font-medium mx-4">
          ПОСЛУГИ
        </h2>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* Menu Items */}
      <div className="space-y-3">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">Завантаження послуг...</div>
          </div>
        ) : (
          menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className="w-full bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <div className="text-left">
                  <div className="font-semibold text-gray-800 text-base">
                    {item.title}
                  </div>
                  {item.subtitle && (
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      {item.subtitle}
                    </div>
                  )}
                </div>
              </div>
              <ChevronRight 
                size={20} 
                className="text-gray-400 group-hover:text-gray-600 transition-colors" 
              />
            </button>
          ))
        )}
      </div>

      {/* Services Modal */}
      <ServicesModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        serviceTitle={modalContent?.title}
        serviceDescription={modalContent?.description}
        onBookService={onBookService}
      />
    </div>
  );
}
