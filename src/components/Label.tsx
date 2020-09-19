import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';

export enum LabelKinds {
  primary,
  secondary,
}

interface LabelTextProps {
  kind: LabelKinds;
}

const LabelText = styled.Text<LabelTextProps>`
  font-size: 14px;
  font-family: 'Recursive-Regular';
  color: ${({ kind }) =>
    kind === LabelKinds.primary ? colors.white : colors.grey};
`;

interface LabelProps {
  kind: LabelKinds;
  children: ReactNode;
  style?: any;
}

export const Label = ({ kind, children, style }: LabelProps) => {
  return (
    <LabelText kind={kind} style={style}>
      {children}
    </LabelText>
  );
};
