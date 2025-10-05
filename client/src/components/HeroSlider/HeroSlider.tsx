import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import { useState } from 'react';
import { GraduationCap, Clock, Trophy } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface HeroSliderProps {
  images: string[];
}

export default function HeroSlider({ images }: HeroSliderProps) {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);

  const slideTexts = [
    "Викладач Jazz Funk",
    "Навчання від 8 років",
    "Учні займають призові місця на змаганнях"
  ];

  const slideIcons = [
    <GraduationCap size={16} />,
    <Clock size={16} />,
    <Trophy size={16} />
  ];

  const handleSlideChange = (swiperInstance: { isBeginning: boolean; isEnd: boolean; activeIndex: number }) => {
    setIsBeginning(swiperInstance.isBeginning);
    setIsEnd(swiperInstance.isEnd);
    setCurrentSlide(swiperInstance.activeIndex + 1);
  };

  return (
    <div className="relative w-full h-[20vh] min-h-[300px] max-h-[500px] min-w-[300px] overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={false}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        loop={false}
        onSlideChange={handleSlideChange}
        className="w-full h-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={image}
                alt={`Hero image ${index + 1}`}
                className="w-full h-full object-cover object-center"
                style={{
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
              {/* Overlay for better text readability if needed */}
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom Navigation Buttons - positioned absolutely over the slider */}
      <div className={`swiper-button-prev absolute !text-white !w-10 !h-10 !bg-black/30 !rounded-lg hover:!bg-black/50 transition-all duration-300 !left-4 !top-1/2 !-translate-y-1/2 !z-20 !flex !items-center !justify-center !backdrop-blur-md ${isBeginning ? '!opacity-50 !cursor-not-allowed' : '!opacity-100'}`} style={{ top: '50%', transform: 'translateY(-50%)' }}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      <div className={`swiper-button-next absolute !text-white !w-10 !h-10 !bg-black/30 !rounded-lg hover:!bg-black/50 transition-all duration-300 !right-4 !top-1/2 !-translate-y-1/2 !z-20 !flex !items-center !justify-center !backdrop-blur-md ${isEnd ? '!opacity-50 !cursor-not-allowed' : '!opacity-100'}`} style={{ top: '50%', transform: 'translateY(-50%)' }}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
      
      {/* Slide Counter - Bottom Right */}
      <div className="absolute bottom-4 right-4 z-20 bg-black/30 backdrop-blur-md rounded-lg px-3 py-1">
        <span className="text-white text-sm font-medium">
          {currentSlide}/{images.length}
        </span>
      </div>
      
      {/* Slide Text - Bottom Left */}
      <div className="absolute bottom-4 left-4 z-20 bg-black/30 backdrop-blur-md rounded-lg px-3 py-2 max-w-[75%]">
        <div className="flex items-center gap-2">
          <span className="text-white">
            {slideIcons[currentSlide - 1]}
          </span>
          <span className="text-white font-medium leading-tight truncate" style={{ fontSize: '14px' }}>
            {slideTexts[currentSlide - 1]}
          </span>
        </div>
      </div>
    </div>
  );
}
