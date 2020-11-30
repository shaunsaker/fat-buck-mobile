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
import { navigate } from '../Router';
import { SmallText } from './SmallText';
import { FONT_BOLD, RHYTHM } from '../constants';

const HeaderBarContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${RHYTHM}px;
`;

const HeaderBarAlignmentContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const HeaderBarMenuIconContainer = styled(TouchableIcon)`
  margin-right: ${RHYTHM / 2}px;
`;

const HeaderBarTextContainer = styled.View``;

const HeaderBarText = styled.Text`
  font-size: 24px;
  font-family: ${FONT_BOLD};
  color: ${colors.white};
`;

const HeaderBarBetaText = styled(SmallText)`
  color: ${colors.transWhite};
  position: absolute;
  top: 0;
  right: -35px;
`;

const HeaderBarCloseButtonContainer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  padding: ${RHYTHM}px;
`;

interface HeaderBarBaseProps extends HeaderBarProps {
  hideMenu?: boolean;
  handleMenuPress: () => void;
  handleClose?: () => void;
}

const HeaderBarBase = ({
  hideMenu,
  handleMenuPress,
  handleClose,
}: HeaderBarBaseProps) => {
  return (
    <HeaderBarContainer>
      <HeaderBarAlignmentContainer>
        {!hideMenu ? (
          <HeaderBarMenuIconContainer onPress={handleMenuPress}>
            <MenuIcon width={24} height={24} fill={colors.white} />
          </HeaderBarMenuIconContainer>
        ) : null}

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
  hideMenu?: boolean;
}

export const HeaderBar = ({
  showClose,
  hideMenu,
  ...props
}: HeaderBarProps) => {
  const dispatch = useDispatch();

  const onMenuPress = useCallback(() => {
    dispatch(setSideMenuIsOpen(true));
  }, [dispatch]);

  const onClose = useCallback(() => {
    navigate();
  }, []);

  return (
    <HeaderBarBase
      {...props}
      hideMenu={hideMenu}
      handleMenuPress={onMenuPress}
      handleClose={showClose ? onClose : undefined}
    />
  );
};
