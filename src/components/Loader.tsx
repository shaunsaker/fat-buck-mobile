import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';

const LoaderContainer = styled.ActivityIndicator`
  color: ${colors.white};
`;

interface LoaderProps {}

export const Loader = ({}: LoaderProps) => {
  return <LoaderContainer size="small" />;
};
