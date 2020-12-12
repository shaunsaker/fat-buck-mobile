import React from 'react';
import { TextProps } from 'react-native';
import styled from 'styled-components/native';

interface DimensionsProps {
  length: number;
  height: number;
}

const Container = styled.View<DimensionsProps>`
  width: ${({ height }) => height}px;
  height: ${({ length }) => length}px;
`;

const getOffset = ({ length, height }: DimensionsProps): number => {
  return length / 2 - height / 2;
};

const Text = styled.Text<DimensionsProps>`
  transform: rotate(-90deg)
    translateX(${({ length, height }) => -1 * getOffset({ length, height })}px)
    translateY(${({ length, height }) => getOffset({ length, height })}px);
  width: ${({ length }) => length}px;
  height: ${({ height }) => height}px;
`;

interface VerticalTextProps extends TextProps {
  length: number;
  height: number;
  children: string;
}

// FIXME: could use onLayout to calculate the length and height
export const VerticalText = ({
  length,
  height,
  children,
  ...props
}: VerticalTextProps) => {
  return (
    <Container length={length} height={height}>
      <Text length={length} height={height} {...props}>
        {children}
      </Text>
    </Container>
  );
};
