import { useState } from 'react';
import { Menu, User, Phone, Mail, Facebook, Instagram, Info, FileText, ExternalLink, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthForm from '../AuthForm/AuthForm';
import CloseButton from '../CloseButton/CloseButton';

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleAuthClick = () => {
    setIsAuthOpen(true);
    setIsOpen(false);
  };

  return (
    <>
      {/* Burger Button - Mobile Only */}
      <div className="md:hidden">
        <Button
          onClick={handleOpen}
          variant="outline"
          className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300 shadow-md"
          style={{ width: '40px', height: '40px' }}
        >
          <Menu size={24} />
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop with blur and darkening */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={handleClose}
          />
          
          {/* Menu Panel - 80% width from left */}
          <div className="absolute left-0 top-0 h-full w-4/5 bg-white/95 backdrop-blur-md animate-in slide-in-from-left duration-300 overflow-y-auto">
            <div className="p-6">
              {/* Menu Header */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800">Меню</h2>
              </div>

              {/* Auth Button */}
              <div className="mb-6">
                <button
                  onClick={handleAuthClick}
                  className="w-full flex items-center justify-between p-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <User size={20} className="text-gray-800" />
                    <span className="text-gray-800 font-medium">Авторизуйтесь</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </button>
                <div className="mt-3 p-4 bg-white border border-gray-300 rounded-lg shadow-md">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Авторизуйтесь</span> щоб спростити процес запису та користуватися додатковими функціями.
                  </p>
                </div>
              </div>

              {/* Contacts Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Контакти</h3>
                <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 border-b border-gray-200">
                  <Phone size={20} className="text-gray-800" />
                  <span className="text-gray-700">+380979665165</span>
                </div>
                <div className="flex items-center gap-3 p-3 border-b border-gray-200">
                  <Mail size={20} className="text-gray-800" />
                  <span className="text-gray-700">diana.xx@gmail.com</span>
                </div>
                </div>
              </div>

              {/* Social Media Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Ми в соцмережах</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Facebook size={20} className="text-gray-800" />
                    <span className="text-gray-700">Facebook</span>
                  </div>
                  <ExternalLink size={16} className="text-gray-400" />
                </div>
                <div className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Instagram size={20} className="text-gray-800" />
                    <span className="text-gray-700">Instagram</span>
                  </div>
                  <ExternalLink size={16} className="text-gray-400" />
                </div>
                <div className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gray-800 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">G</span>
                    </div>
                    <span className="text-gray-700">Google</span>
                  </div>
                    <ExternalLink size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Useful Information Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Корисна інформація</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Info size={20} className="text-gray-800" />
                      <span className="text-gray-700">Інформація про компанію</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-gray-800" />
                      <span className="text-gray-700">Умови користування</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Close Button Area - 20% width from right */}
          <div className="absolute right-0 top-0 h-full w-1/5 flex justify-center mt-5" >
            <CloseButton onClick={handleClose} size="xs" />
          </div>
        </div>
      )}

      {/* Auth Modal */}
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
            <CloseButton onClick={() => setIsAuthOpen(false)} size="xs" />
          </div>
        </div>
      )}
    </>
  );
}
