import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import {
  createDepositCall,
  setSelectedWalletId,
  setSliderIndex,
} from '../../store/actions';
import { Sliders } from '../../store/sliders/models';
import {
  selectSelectedWallet,
  selectSelectedWalletId,
} from '../../store/wallets/selectors';
import { Background } from '../Background';
import { HeaderBar } from '../HeaderBar';
import { PageHeader } from '../PageHeader';
import { Slider, SliderProps } from '../Slider';
import { selectDepositSliderIndex } from '../../store/sliders/selectors';
import { slides as depositSlides } from './slides';
import { sortArrayOfObjectsByKey } from '../../utils/sortArrayOfObjectsByKey';
import { navigate } from '../../Router';
import { selectDepositCallsLoading } from '../../store/depositCalls/selectors';
import { objectToArray } from '../../utils/objectToArray';

const DEPOSIT_SLIDES_ARRAY = sortArrayOfObjectsByKey(
  objectToArray(depositSlides),
  'slideIndex',
);

const DepositContainer = styled.View`
  flex: 1;
`;

interface DepositBaseProps extends SliderProps {}

const DepositBase = ({ ...sliderProps }: DepositBaseProps) => {
  return (
    <Background>
      <HeaderBar showClose />

      <PageHeader>Deposit BTC</PageHeader>

      <DepositContainer>
        <Slider {...sliderProps} />
      </DepositContainer>
    </Background>
  );
};

interface DepositProps {}

export const Deposit = ({}: DepositProps) => {
  const dispatch = useDispatch();
  const slideIndex = useSelector(selectDepositSliderIndex);
  const selectedWalletId = useSelector(selectSelectedWalletId);
  const selectedWallet = useSelector(selectSelectedWallet);
  const isDepositCallsLoading = useSelector(selectDepositCallsLoading);
  const slides = DEPOSIT_SLIDES_ARRAY.map((slide, index) => {
    const isCurrentSlide = index === slideIndex;
    const isCurrentlyOnPoolAddressSlide =
      slideIndex === depositSlides.poolAddress.slideIndex;
    const loading =
      isCurrentSlide && isCurrentlyOnPoolAddressSlide && isDepositCallsLoading;

    const isCurrentSlideBeforePoolAddressSlide =
      slideIndex < depositSlides.poolAddress.slideIndex;
    const userHasSelectedWallet = selectedWalletId;
    const disabled =
      loading ||
      (isCurrentSlideBeforePoolAddressSlide && !userHasSelectedWallet);

    return {
      ...slide,
      disabled,
      loading,
    };
  });

  const onSetSlideIndex = useCallback(
    (index: number) => {
      dispatch(setSliderIndex(Sliders.deposit, index));
    },
    [dispatch],
  );

  const onSubmit = useCallback(() => {
    const isPoolAddressSlide =
      slideIndex === depositSlides.poolAddress.slideIndex;
    const isLastSlide = slideIndex === Object.keys(depositSlides).length - 1;
    if (isPoolAddressSlide) {
      dispatch(createDepositCall(selectedWallet.address));
    } else if (isLastSlide) {
      navigate(); // pop the scene
    } else {
      dispatch(setSliderIndex(Sliders.deposit, slideIndex + 1));
    }
  }, [slideIndex, dispatch, selectedWallet]);

  useEffect(() => {
    // on unmount, reset the slide index and selected wallet
    return () => {
      dispatch(setSliderIndex(Sliders.deposit, 0));
      dispatch(setSelectedWalletId(''));
    };
  }, [dispatch]);

  return (
    <DepositBase
      slideIndex={slideIndex}
      slides={slides}
      onSetSlideIndex={onSetSlideIndex}
      onSubmit={onSubmit}
    />
  );
};
