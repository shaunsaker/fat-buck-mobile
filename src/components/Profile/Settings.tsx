import React from 'react';
import styled from 'styled-components/native';

const SettingsContainer = styled.View``;

interface SettingsBaseProps {}

const SettingsBase = ({}: SettingsBaseProps) => {
  return <SettingsContainer />;
};

interface SettingsProps {}

export const Settings = ({}: SettingsProps) => {
  return <SettingsBase />;
};
