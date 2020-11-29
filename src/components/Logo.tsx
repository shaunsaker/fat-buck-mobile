import React from 'react';
import LogoIcon from '../icons/logo.svg';
import LogoInitialIcon from '../icons/logo-initial.svg';
import LogoLookingIcon from '../icons/logo-looking.svg';
import LogoEatingIcon from '../icons/logo-eating.svg';
import LogoHangryIcon from '../icons/logo-hangry.svg';

export enum LogoVariants {
  initial = 'logo-initial',
  looking = 'logo-looking',
  eating = 'logo-eating',
  hangry = 'logo-hangry',
}

interface LogoProps {
  variant?: LogoVariants;
  size?: number;
}

export const Logo = ({ variant, size = 50 }: LogoProps) => {
  const defaultProps = {
    width: size,
    height: size,
  };

  if (variant === LogoVariants.initial) {
    return <LogoInitialIcon {...defaultProps} />;
  }

  if (variant === LogoVariants.looking) {
    return <LogoLookingIcon {...defaultProps} />;
  }

  if (variant === LogoVariants.eating) {
    return <LogoEatingIcon {...defaultProps} />;
  }

  if (variant === LogoVariants.hangry) {
    return <LogoHangryIcon {...defaultProps} />;
  }

  return <LogoIcon {...defaultProps} />;
};

export default Logo;
