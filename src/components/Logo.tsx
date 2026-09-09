import React from 'react';
import logoImg from '@/assets/logo.png';
import logoWhiteImg from '@/assets/logo-white.png';

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  variant?: 'default' | 'light';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  variant = 'default',
  className = 'h-7 w-auto',
  alt = 'StayB',
  ...props
}) => {
  const src = variant === 'light' ? logoWhiteImg : logoImg;

  return (
    <img
      src={src}
      alt={alt}
      className={`object-contain select-none ${className}`}
      {...props}
    />
  );
};

export default Logo;
