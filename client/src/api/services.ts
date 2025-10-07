import axios from 'axios';

const API_BASE_URL = '/api';

export interface IService {
  id: string;
  name: string;
  description: string;
  duration?: string;
  price?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Fallback данные для случая когда сервер недоступен
export const fallbackServices: IService[] = [
  {
    id: '1',
    name: 'Jazz Funk',
    description: 'Сучасний танець з елементами джазу та фанку',
    duration: '60 хв',
    price: '500 грн',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Contemporary',
    description: 'Сучасний танець з акцентом на емоційність',
    duration: '60 хв',
    price: '500 грн',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Hip-Hop',
    description: 'Енергійний танець у стилі хіп-хоп',
    duration: '60 хв',
    price: '500 грн',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Stretching',
    description: 'Розтяжка та гнучкість тіла',
    duration: '45 хв',
    price: '400 грн',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Choreography',
    description: 'Постановка танцювальних номерів',
    duration: '90 хв',
    price: '700 грн',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Consultation',
    description: 'Консультація з тренером',
    duration: '30 хв',
    price: '300 грн',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const fetchServices = async (): Promise<IService[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/services`);
    return response.data.data;
  } catch (error: any) {
    // Если сервер недоступен, возвращаем fallback данные
    if (error.code === 'ERR_CONNECTION_REFUSED' || error.code === 'ERR_NETWORK') {
      console.warn('Server is not available, using fallback services');
      return fallbackServices;
    }
    throw error;
  }
};

export const fetchServiceById = async (id: string): Promise<IService> => {
  const response = await axios.get(`${API_BASE_URL}/services/${id}`);
  return response.data.data;
};
