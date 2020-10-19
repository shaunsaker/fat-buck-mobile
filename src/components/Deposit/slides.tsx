import React from 'react';
import { PoolAddressSlide } from './PoolAddressSlide';
import { SelectWalletSlide } from './SelectWalletSlide';
import { SuccessSlide } from './SuccessSlide';
import { Slide } from '../Slider';

type Slides = 'selectWallet' | 'poolAddress' | 'success';

export const slides: Record<Slides, Slide> = {
  selectWallet: {
    slideIndex: 0,
    children: <SelectWalletSlide />,
    buttonText: 'CONTINUE',
  },
  poolAddress: {
    slideIndex: 1,
    children: <PoolAddressSlide />,
    buttonText: "I'VE TRANSFERRED MY BTC",
  },
  success: {
    slideIndex: 2,
    children: <SuccessSlide />,
    buttonText: 'DONE',
  },
};
