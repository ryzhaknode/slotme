import { MdWhatsapp } from 'react-icons/md';
import { useState } from 'react';
import HeroSlider from '../../components/HeroSlider/HeroSlider';
import LoginOverlay from '../../components/LoginOverlay/LoginOverlay';
import InstructorInfo from '../../components/InstructorInfo/InstructorInfo';
import ServiceButtons from '../../components/ServiceButtons/ServiceButtons';
import DigitalMenu from '../../components/DigitalMenu/DigitalMenu';
import DateMenu from '../../components/DateMenu/DateMenu';

// Hero slider images - square aspect ratio (1:1)
const heroImages = [
  '/image/IMG_0161.JPG',
  '/image/IMG_0172.JPG',
  '/image/IMG_0183.JPG',
];

export default function HomePage() {
  const [showDateMenu, setShowDateMenu] = useState(false);
  const [activeButton, setActiveButton] = useState<'services' | 'booking'>('services');
  const [selectedService, setSelectedService] = useState<string>('Консультація');

  const handleBookService = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setShowDateMenu(true);
    setActiveButton('booking');
  };

  const handleBackToServices = () => {
    setShowDateMenu(false);
  };

  const handleShowServices = () => {
    setShowDateMenu(false);
    setActiveButton('services');
  };

  const handleBookingSuccess = () => {
    // Сбрасываем выбранную услугу и переходим к услугам
    setSelectedService('Консультація');
    setShowDateMenu(false);
    setActiveButton('services');
  };

  const handleServiceSelect = (serviceName: string) => {
    setSelectedService(serviceName);
  };

  return (
    <div className="min-w-[300px] w-full">
      {/* Hero Slider with Login Overlay */}
      <div className="relative w-full">
        <HeroSlider images={heroImages} />
        <LoginOverlay />
      </div>
      
      {/* Instructor Info */}
      <InstructorInfo />
      
      {/* Service Buttons */}
      <ServiceButtons 
        onBookService={handleBookService} 
        onShowServices={handleShowServices}
        activeButton={activeButton}
      />
      
      {/* Digital Menu or Date Menu */}
      {showDateMenu ? (
        <DateMenu 
          selectedService={selectedService} 
          onSuccess={handleBookingSuccess}
          onServiceSelect={handleServiceSelect}
        />
      ) : (
        <DigitalMenu onBookService={handleBookService} />
      )}

    </div>
  );
}
