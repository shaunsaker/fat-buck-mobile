import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import RNQRCodeScanner, { Event } from 'react-native-qrcode-scanner';
import { HeaderBar } from '../HeaderBar';
import { HeadingText } from '../HeadingText';
import { ParagraphText } from '../ParagraphText';
import { colors } from '../../colors';
import { navigate, Screens } from '../../Router';
import { RHYTHM } from '../../constants';

const TopSectionContainer = styled.SafeAreaView`
  align-self: stretch;
`;

const HeadingTextContainer = styled.View`
  margin-bottom: ${RHYTHM / 4}px;
`;

interface TopSectionProps {}

const TopSection = ({}: TopSectionProps) => {
  return (
    <TopSectionContainer>
      <HeaderBar showClose />

      <HeadingTextContainer>
        <HeadingText center>Capture QR Code</HeadingText>
      </HeadingTextContainer>

      <ParagraphText center>
        Frame the QR Code within the box below.
      </ParagraphText>
    </TopSectionContainer>
  );
};

interface QRCodeScannerBaseProps {
  onRead: (event: Event) => void;
}

const QRCodeScannerBase = ({ onRead }: QRCodeScannerBaseProps) => {
  return (
    <RNQRCodeScanner
      topContent={<TopSection />}
      topViewStyle={{
        backgroundColor: colors.black,
        justifyContent: 'flex-start',
      }}
      bottomViewStyle={{ backgroundColor: colors.black }}
      showMarker
      markerStyle={{ borderWidth: 3, borderColor: colors.primary }}
      fadeIn={false}
      onRead={onRead}
    />
  );
};

interface QRCodeScannerProps {}

export const QRCodeScanner = ({}: QRCodeScannerProps) => {
  const handleRead = useCallback((event: Event) => {
    navigate(Screens.editWallet, {
      address: event.data,
    });
  }, []);

  return <QRCodeScannerBase onRead={handleRead} />;
};
