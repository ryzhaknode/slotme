import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User, X } from 'lucide-react';
import AuthForm from '../AuthForm/AuthForm';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

export default function LoginOverlay() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleAuthClick = () => {
    setIsAuthOpen(true);
  };

  const handleClose = () => {
    setIsAuthOpen(false);
  };

  return (
    <>
      {/* Top Right Buttons */}
      <div className="absolute top-4 right-4 z-30 flex gap-2">
        {/* Burger Menu - Mobile Only */}
        <BurgerMenu />
        
        {/* User Button */}
        <Button
          onClick={handleAuthClick}
          variant="outline"
          className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300 shadow-md"
          style={{ width: '40px', height: '40px' }}
        >
          <User size={24} />
        </Button>
      </div>

      {/* Auth Slider - Slides in from right */}
      {isAuthOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-300">
          <div className="absolute right-0 top-0 h-full w-4/5 bg-white shadow-2xl animate-in slide-in-from-right duration-300">
            {/* Auth Content */}
            <div className="p-8">
              <AuthForm type="login" />
            </div>
          </div>
          
          {/* Close Button Area - 20% width from left */}
          <div className="absolute left-0 top-0 h-full w-1/5 flex justify-center mt-5">
            <button
              onClick={handleClose}
              className="bg-orange text-black hover:bg-orange-600 transition-all duration-300 rounded-lg flex items-center justify-center"
              style={{ width: '40px', height: '40px' }}
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
