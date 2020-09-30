import React from 'react';
import LogoIcon from '../icons/logo.svg';

interface LogoProps {
  size?: number;
}

export const Logo = ({ size = 36 }: LogoProps) => {
  return <LogoIcon width={size} height={size} />;
};

export default Logo;
