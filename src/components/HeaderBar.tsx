import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import MenuIcon from '../icons/menu.svg';
import Logo from './Logo';
import { colors } from '../colors';
import { TouchableIcon } from './TouchableIcon';
import { useDispatch } from 'react-redux';
import { setSideMenuIsOpen } from '../store/actions';
import app from '../../app.json';
import { CloseButton } from './CloseButton';
import { useNavigation } from '@react-navigation/native';
import { dimensions } from '../dimensions';

const HeaderBarContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${dimensions.rhythm}px;
`;

const HeaderBarAlignmentContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const HeaderBarMenuIconContainer = styled(TouchableIcon)`
  margin-right: ${dimensions.rhythm / 2}px;
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
  color: ${colors.transWhite};
  position: absolute;
  top: 0;
  right: -30px;
`;

const HeaderBarCloseButtonContainer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  padding: ${dimensions.rhythm}px;
`;

interface HeaderBarBaseProps extends HeaderBarProps {
  handleMenuPress: () => void;
  handleClose?: () => void;
}

const HeaderBarBase = ({
  handleMenuPress,
  handleClose,
}: HeaderBarBaseProps) => {
  return (
    <HeaderBarContainer>
      <HeaderBarAlignmentContainer>
        <HeaderBarMenuIconContainer onPress={handleMenuPress}>
          <MenuIcon width={24} height={24} fill={colors.white} />
        </HeaderBarMenuIconContainer>

        <Logo />
      </HeaderBarAlignmentContainer>

      <HeaderBarTextContainer>
        <HeaderBarText>{app.displayName}</HeaderBarText>

        <HeaderBarBetaText>BETA</HeaderBarBetaText>
      </HeaderBarTextContainer>

      <HeaderBarAlignmentContainer />

      {handleClose ? (
        <HeaderBarCloseButtonContainer>
          <CloseButton onPress={handleClose} />
        </HeaderBarCloseButtonContainer>
      ) : null}
    </HeaderBarContainer>
  );
};

interface HeaderBarProps {
  showClose?: boolean;
}

export const HeaderBar = ({ showClose, ...props }: HeaderBarProps) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onMenuPress = useCallback(() => {
    dispatch(setSideMenuIsOpen(true));
  }, [dispatch]);

  const onClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <HeaderBarBase
      {...props}
      handleMenuPress={onMenuPress}
      handleClose={showClose ? onClose : undefined}
    />
  );
};
