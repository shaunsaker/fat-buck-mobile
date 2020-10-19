import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { Deposit } from '.';
import { mountComponent } from '../../testUtils';
import rootReducer, { initialState } from '../../store/reducers';
import {
  createDepositCall,
  setSelectedWalletId,
  setSliderIndex,
  syncWalletsSuccess,
} from '../../store/actions';
import { slides } from './slides';
import { getProgressItemTestId } from '../Slider';
import { Wallets } from '../../store/wallets/models';
import moment from 'moment';
import { Sliders } from '../../store/sliders/models';
import { navigateBack } from '../../store/navigation/actions';

describe('Deposit', () => {
  const selectWalletSlideButtonText = slides.selectWallet.buttonText;
  const poolAddressSlideButtonText = slides.poolAddress.buttonText;
  const successSlideButtonText = slides.success.buttonText;
  const selectedWalletId = '1';
  const wallets: Wallets = {
    [selectedWalletId]: {
      id: selectedWalletId,
      name: '',
      address: '',
      dateAdded: moment().toISOString(),
    },
  };

  it('does nothing on submit if a wallet is not selected', () => {
    const { getByText, queryByText } = mountComponent(<Deposit />);

    fireEvent.press(getByText(selectWalletSlideButtonText));

    expect(getByText(selectWalletSlideButtonText)).toBeDefined();
    expect(queryByText(poolAddressSlideButtonText)).toBeNull();
  });

  it('does nothing on progress press if a wallet is not selectd', () => {
    const { getByTestId, getByText, queryByText } = mountComponent(<Deposit />);

    fireEvent.press(getByTestId(getProgressItemTestId(1)));

    expect(getByText(selectWalletSlideButtonText)).toBeDefined();
    expect(queryByText(poolAddressSlideButtonText)).toBeNull();
  });

  it('moves to the PoolAddress slide when a wallet is selected and submit is pressed', () => {
    const state = rootReducer(initialState, setSelectedWalletId('1'));
    const { getByText, queryByText } = mountComponent(<Deposit />, state);

    fireEvent.press(getByText(selectWalletSlideButtonText));

    expect(getByText(poolAddressSlideButtonText)).toBeDefined();
    expect(queryByText(selectWalletSlideButtonText)).toBeNull();
  });

  it('moves to the PoolAddress slide when a wallet is selected and progress is pressed', () => {
    const state = rootReducer(initialState, setSelectedWalletId('1'));
    const { getByTestId, getByText, queryByText } = mountComponent(
      <Deposit />,
      state,
    );

    fireEvent.press(
      getByTestId(getProgressItemTestId(slides.poolAddress.slideIndex)),
    );

    expect(getByText(poolAddressSlideButtonText)).toBeDefined();
    expect(queryByText(selectWalletSlideButtonText)).toBeNull();
  });

  it('does not move to the Success slide when a wallet is selected and progress is pressed', () => {
    const state = rootReducer(initialState, setSelectedWalletId('1'));
    const { getByTestId, getByText, queryByText } = mountComponent(
      <Deposit />,
      state,
    );

    fireEvent.press(
      getByTestId(getProgressItemTestId(slides.success.slideIndex)),
    );

    expect(getByText(selectWalletSlideButtonText)).toBeDefined();
    expect(queryByText(successSlideButtonText)).toBeNull();
  });

  it('creates a deposit call from the PoolAddress slide', () => {
    let state = rootReducer(
      initialState,
      setSliderIndex(Sliders.deposit, slides.poolAddress.slideIndex),
    );
    state = rootReducer(state, setSelectedWalletId('1'));
    state = rootReducer(state, syncWalletsSuccess(wallets));
    const { getByText, spy } = mountComponent(<Deposit />, state);

    fireEvent.press(getByText(poolAddressSlideButtonText));

    expect(spy).toHaveBeenLastCalledWith(
      createDepositCall(wallets[selectedWalletId].address),
    );
  });

  it('navigates back when submitting on the Success slide', () => {
    let state = rootReducer(
      initialState,
      setSliderIndex(Sliders.deposit, slides.success.slideIndex),
    );
    state = rootReducer(state, setSelectedWalletId('1'));
    state = rootReducer(state, syncWalletsSuccess(wallets));
    const { getByText, spy } = mountComponent(<Deposit />, state);

    fireEvent.press(getByText(successSlideButtonText));

    expect(spy).toHaveBeenLastCalledWith(navigateBack());
  });

  it('resets the slide index and selected wallet id on unmount', () => {
    const state = rootReducer(initialState, setSelectedWalletId('1'));
    const { unmount, spy } = mountComponent(<Deposit />, state);

    unmount();

    expect(spy).toHaveBeenCalledWith(setSliderIndex(Sliders.deposit, 0));
    expect(spy).toHaveBeenCalledWith(setSelectedWalletId(''));
  });
});
