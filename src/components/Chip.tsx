import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';

const ChipContainer = styled.View`
  background-color: ${colors.lightAccent};
  padding: 5px 10px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export enum ChipKinds {
  primary,
  secondary,
  tertiary,
}

interface ChipTextProps {
  kind: ChipKinds;
}

const ChipText = styled.Text<ChipTextProps>`
  font-size: 16px;
  font-family: 'Recursive-Bold';
  color: ${({ kind }) =>
    kind === ChipKinds.primary
      ? colors.accent
      : kind === ChipKinds.secondary
      ? colors.primary
      : colors.secondary};
`;

export interface ChipProps {
  kind: ChipKinds;
  children: string;
}

export const Chip = ({ kind, children }: ChipProps) => {
  return (
    <ChipContainer>
      <ChipText kind={kind}>{children}</ChipText>
    </ChipContainer>
  );
};

export default Chip;
