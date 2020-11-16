import styled from 'styled-components/native';
import { colors } from '../colors';
import { FONT_BOLD, RHYTHM } from '../constants';

export const EmptyStateText = styled.Text`
  font-family: ${FONT_BOLD};
  font-size: 16px;
  color: ${colors.white};
  text-align: center;
  margin-bottom: ${RHYTHM}px;
`;
