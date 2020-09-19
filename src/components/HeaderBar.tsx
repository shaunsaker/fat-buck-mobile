import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import MenuIcon from '../icons/menu.svg';
import Logo from './Logo';
import { colors } from '../colors';
import { TouchableIcon } from './TouchableIcon';
import { useDispatch } from 'react-redux';
import { setSideMenuIsOpen } from '../store/actions';
import pkg from '../../package.json';

const HeaderBarContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const HeaderBarAlignmentContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const HeaderBarMenuIconContainer = styled(TouchableIcon)`
  margin-right: 10px;
`;

const HeaderBarTextContainer = styled.View``;

const HeaderBarText = styled.Text`
  font-size: 24px;
  font-family: 'Recursive-Bold';
  color: ${colors.white};
`;

const HeaderBarBetaText = styled.Text`
  font-size: 12px;
  font-family: 'Recursive-Regular';
  color: ${colors.grey};
  position: absolute;
  top: 0;
  right: -30px;
`;

interface HeaderBarBaseProps extends HeaderBarProps {
  handleMenuPress: () => void;
}

const HeaderBarBase = ({ handleMenuPress }: HeaderBarBaseProps) => {
  return (
    <HeaderBarContainer>
      <HeaderBarAlignmentContainer>
        <HeaderBarMenuIconContainer onPress={handleMenuPress}>
          <MenuIcon width={24} height={24} fill={colors.white} />
        </HeaderBarMenuIconContainer>

        <Logo />
      </HeaderBarAlignmentContainer>

      <HeaderBarTextContainer>
        <HeaderBarText>{pkg.name}</HeaderBarText>

        <HeaderBarBetaText>BETA</HeaderBarBetaText>
      </HeaderBarTextContainer>

      <HeaderBarAlignmentContainer />
    </HeaderBarContainer>
  );
};

interface HeaderBarProps {}

export const HeaderBar = (props: HeaderBarProps) => {
  const dispatch = useDispatch();

  const onMenuPress = useCallback(() => {
    dispatch(setSideMenuIsOpen(true));
  }, [dispatch]);

  return <HeaderBarBase {...props} handleMenuPress={onMenuPress} />;
};
