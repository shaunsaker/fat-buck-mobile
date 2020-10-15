import React, { useCallback, useEffect, useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import styled from 'styled-components/native';
import { ParagraphText } from '../ParagraphText';
import { SmallText } from '../SmallText';
import CopyIcon from '../../icons/copy.svg';
import { colors } from '../../colors';
import { TouchableOpacity } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { showSnackbar } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Step } from '../Step';
import { selectDepositSliderIndex } from '../../store/sliders/selectors';
import { slides } from './slides';
import { RHYTHM } from '../../constants';
import { DEPOSIT_COMMISSION_PERCENT, POOL_ADDRESS } from '../../config';

const PoolAddressSlideContainer = styled.View`
  align-items: center;
`;

const QRCodeContainer = styled.View`
  margin-bottom: ${RHYTHM}px;
`;

const AddressContainer = styled.View`
  margin-bottom: ${RHYTHM}px;
  flex-direction: row;
  align-items: center;
`;

const AddressTextContainer = styled.View`
  flex: 1;
  margin-right: ${RHYTHM / 2}px;
`;

const CopyIconContainer = styled(TouchableOpacity)``;

interface PoolAddressSlideBaseProps {
  poolAddress: string;
  commission: number;
  isActive: boolean;
  isDone: boolean;
  onCopyPoolAddress: () => void;
}

const PoolAddressSlideBase = ({
  poolAddress,
  commission,
  isActive,
  isDone,
  onCopyPoolAddress,
}: PoolAddressSlideBaseProps) => {
  return (
    <PoolAddressSlideContainer>
      <Step
        number={slides.poolAddress.slideIndex + 1}
        title="Transfer to the Pool"
        subtitle="Grab our Pool address and transfer BTC to it."
        isActive={isActive}
        isDone={isDone}
      />

      <QRCodeContainer>
        <QRCode value={poolAddress} size={200} />
      </QRCodeContainer>

      <AddressContainer>
        <AddressTextContainer>
          <ParagraphText bold>{poolAddress}</ParagraphText>
        </AddressTextContainer>

        <CopyIconContainer onPress={onCopyPoolAddress}>
          <CopyIcon width={24} height={24} fill={colors.white} />
        </CopyIconContainer>
      </AddressContainer>

      <SmallText center>
        NOTE: We charge {commission}% commission on each deposit. Please only
        deposit BTC to this address. Depending on the BTC network, it could take
        a few minutes to a few days for your deposit to reflect.
      </SmallText>
    </PoolAddressSlideContainer>
  );
};

interface PoolAddressSlideProps {}

export const PoolAddressSlide = ({}: PoolAddressSlideProps) => {
  const [isDone, setIsDone] = useState(false);
  const dispatch = useDispatch();
  const poolAddress = POOL_ADDRESS;
  const commission = DEPOSIT_COMMISSION_PERCENT;
  const slideIndex = useSelector(selectDepositSliderIndex);
  const isActive = slides.poolAddress.slideIndex === slideIndex;

  useEffect(() => {
    const isCurrentSlidePastPoolAddressSlide =
      slideIndex > slides.poolAddress.slideIndex;
    if (isCurrentSlidePastPoolAddressSlide) {
      setIsDone(true);
    }
  }, [slideIndex]);

  const onCopyPoolAddress = useCallback(() => {
    Clipboard.setString(poolAddress);
    dispatch(
      showSnackbar('The pool address has been copied to your clipboard!'),
    );
  }, [dispatch, poolAddress]);

  return (
    <PoolAddressSlideBase
      poolAddress={poolAddress}
      commission={commission}
      isActive={isActive}
      isDone={isDone}
      onCopyPoolAddress={onCopyPoolAddress}
    />
  );
};
