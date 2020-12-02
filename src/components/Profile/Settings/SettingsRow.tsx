import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { colors } from '../../../colors';
import { BORDER_WIDTH, RHYTHM } from '../../../constants';
import { ParagraphText } from '../../ParagraphText';

const SettingsRowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${RHYTHM}px;
  border-bottom-width: ${BORDER_WIDTH}px;
  border-bottom-color: ${colors.lightTransWhite};
`;

interface SettingsRowProps {
  label: string;
  children: ReactNode;
}

export const SettingsRow = ({ label, children }: SettingsRowProps) => {
  return (
    <SettingsRowContainer>
      <ParagraphText bold>{label}</ParagraphText>
      {children}
    </SettingsRowContainer>
  );
};
