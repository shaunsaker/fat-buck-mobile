import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import RNModal from 'react-native-modal';
import { Label, LabelKinds } from './Label';
import { CloseButton } from './CloseButton';

const ExchangesModalContainer = styled.View``;

const ExchangesModalContentContainer = styled.View`
  background-color: ${colors.black};
  margin: 0 20px;
  border-width: 3px;
  border-style: solid;
  border-color: ${colors.primary};
  border-radius: 20px;
  overflow: hidden;
  padding: 20px;
  max-width: 320px;
`;

const ExchangesModalLabelContainer = styled.View`
  align-items: center;
  margin-bottom: 5px;
`;

const ExchangesModalCloseIconContainer = styled.View`
  position: absolute;
  top: 17px;
  right: 17px;
`;

interface ExchangesModalProps {
  title: string;
  isOpen: boolean;
  handleClose: () => void;
  children: ReactNode;
}

export const Modal = ({
  title,
  isOpen,
  handleClose,
  children,
}: ExchangesModalProps) => {
  return (
    <ExchangesModalContainer>
      <RNModal
        isVisible={isOpen}
        backdropColor={colors.black}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        useNativeDriver
        hideModalContentWhileAnimating>
        <ExchangesModalContentContainer>
          <ExchangesModalLabelContainer>
            <Label kind={LabelKinds.primary}>{title}</Label>
          </ExchangesModalLabelContainer>

          <ExchangesModalCloseIconContainer>
            <CloseButton handlePress={handleClose} />
          </ExchangesModalCloseIconContainer>

          {children}
        </ExchangesModalContentContainer>
      </RNModal>
    </ExchangesModalContainer>
  );
};
