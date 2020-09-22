import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../colors';

const BackgroundContainer = styled(LinearGradient)`
  flex: 1;
`;

const BackgroundContentContainer = styled.SafeAreaView`
  flex: 1;
`;

interface BackgroundProps {
  children?: ReactNode;
}

export const Background = ({ children }: BackgroundProps) => {
  return (
    <BackgroundContainer
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 8 }}
      colors={[colors.black, colors.black]}>
      <BackgroundContentContainer>{children}</BackgroundContentContainer>
    </BackgroundContainer>
  );
};
