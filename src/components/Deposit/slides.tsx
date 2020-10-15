import React from 'react';
import { PoolAddressSlide } from './PoolAddressSlide';
import { SelectWalletSlide } from './SelectWalletSlide';
import { SuccessSlide } from './SuccessSlide';
import { Slide } from '../Slider';

export const slides: Record<string, Slide> = {
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
    slideIndex: 3,
    children: <SuccessSlide />,
    buttonText: 'DONE',
  },
};
