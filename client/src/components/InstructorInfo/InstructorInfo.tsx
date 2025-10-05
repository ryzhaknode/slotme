import { useState } from 'react';
import { MapPin } from 'lucide-react';

export default function InstructorInfo() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleShowMore = () => {
    setIsExpanded(true);
  };

  return (
    <div className="max-w-[1046px] mx-auto px-[15px] mt-2">
      <div className="bg-white">
        {/* Main Title */}
        <h1 className="font-bold text-gray-900" style={{ fontSize: '16px' }}>
          Diana Gvozdikova
        </h1>
        
        {/* Address */}
        <div className="mb-2 text-gray-400" style={{ fontSize: '14px' }}>
          вулиця Грушевського, 66, Хмельницький, Хмельницька область, Україна
        </div>
        
        {/* Description */}
        <div className="text-gray-700 relative" style={{ fontSize: '14px' }}>
          {!isExpanded ? (
            <div className="relative">
              <p className="line-clamp-3-with-padding">
                Diana Gvozdikova — професійний викладач Jazz Funk з більш ніж 8-річним досвідом роботи. 
                Спеціалізується на сучасних танцювальних напрямках, включаючи Jazz Funk, Contemporary, 
                та Hip-Hop. Має вищу хореографічну освіту та постійно підвищує свою кваліфікацію на 
                міжнародних майстер-класах. Її учні регулярно займають призові місця на регіональних 
                та всеукраїнських змаганнях з сучасного танцю.
              </p>
              <button
                onClick={handleShowMore}
                className="absolute bottom-0 right-0 text-orange-500 hover:text-orange-600 font-medium transition-colors"
                style={{ fontSize: '14px' }}
              >
                показати
              </button>
            </div>
          ) : (
            <p>
              Diana Gvozdikova — професійний викладач Jazz Funk з більш ніж 8-річним досвідом роботи. 
              Спеціалізується на сучасних танцювальних напрямках, включаючи Jazz Funk, Contemporary, 
              та Hip-Hop. Має вищу хореографічну освіту та постійно підвищує свою кваліфікацію на 
              міжнародних майстер-класах. Її учні регулярно займають призові місця на регіональних 
              та всеукраїнських змаганнях з сучасного танцю. 
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
