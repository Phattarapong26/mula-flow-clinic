
import React from 'react';

interface MenuCardProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary';
  backgroundImage?: string;
  className?: string;
}

const MenuCard: React.FC<MenuCardProps> = ({ 
  title, 
  subtitle,
  icon, 
  variant = 'primary', 
  backgroundImage,
  className = ""
}) => {
  const baseClasses = "relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group";
  
  const variantClasses = variant === 'primary' 
    ? "bg-gradient-to-br from-teal-600 to-teal-700 text-white" 
    : "bg-white border-2 border-teal-200 text-teal-700 hover:border-teal-300";

  const backgroundStyle = backgroundImage 
    ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};

  return (
    <div 
      className={`${baseClasses} ${variantClasses} ${className}`}
      style={backgroundStyle}
    >
      <div className="relative z-10 p-6 h-32 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1">{title}</h3>
            {subtitle && (
              <p className="text-sm opacity-90">{subtitle}</p>
            )}
          </div>
          <div className="ml-4 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
      </div>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
    </div>
  );
};

export default MenuCard;
