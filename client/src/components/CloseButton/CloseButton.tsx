import { X } from 'lucide-react';

interface CloseButtonProps {
  onClick: () => void;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  animation?: 'from-top' | 'from-right';
  className?: string;
}

export default function CloseButton({ onClick, size = 'md', animation = 'from-top', className = '' }: CloseButtonProps) {
  const sizeClasses = {
    xs: 'w-10 h-10',
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  };

  const iconSizes = {
    xs: 20,
    sm: 16,
    md: 24,
    lg: 32
  };

  const animationClasses = {
    'from-top': 'animate-fly-in-from-top',
    'from-right': 'animate-fly-in-from-right'
  };

  return (
    <button
      onClick={onClick}
      className={`${sizeClasses[size]} bg-orange text-black hover:bg-orange-600 transition-all duration-300 rounded-lg flex items-center justify-center ${animationClasses[animation]} ${className}`}
    >
      <X size={iconSizes[size]} />
    </button>
  );
}
