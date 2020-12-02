import React from 'react';
import { ActivityIndicator } from 'react-native';
import { colors } from '../colors';

interface LoaderProps {}

export const Loader = ({}: LoaderProps) => {
  return <ActivityIndicator size="small" color={colors.white} />;
};
