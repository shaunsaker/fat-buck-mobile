import React from 'react';
import styled from 'styled-components/native';
import LogoSvg from '../icons/logo.svg';

const LogoContainer = styled(LogoSvg)``;

interface LogoProps {
  size?: number;
}

export const Logo = ({ size = 36 }: LogoProps) => {
  return <LogoContainer width={size} height={size} />;
};

export default Logo;
