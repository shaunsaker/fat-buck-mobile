import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { mountComponent } from '../../testUtils/mountComponent';
import {
  ADDRESS_INPUT_PLACEHOLDER_TEXT,
  DELETE_BUTTON_TEXT,
  EditWallet,
  NAME_INPUT_PLACEHOLDER_TEXT,
  QR_CODE_BUTTON_TEXT,
  SUBMIT_BUTTON_TEXT,
} from '.';
import { makeRouteProps } from '../../testUtils/makeRouteProps';
import { Screens } from '../../Router';
import { MOCKED_MOMENT_ISO_STRING } from '../../../jest/setup';
import { deleteWallet, saveWallet } from '../../store/actions';
import { navigate } from '../../store/navigation/actions';
import { makeWallet } from '../../testUtils/makeWallet';

describe('EditWallet', () => {
  it('renders the blank AddWallet state', () => {
    const route = makeRouteProps({
      name: Screens.editWallet,
    });
    const {
      getByText,
      getByPlaceholderText,
      queryByText,
      spy,
    } = mountComponent(<EditWallet route={route} />);
    const addWalletTitle = getByText('Add Wallet');
    const nameInput = getByPlaceholderText(NAME_INPUT_PLACEHOLDER_TEXT);
    const addressInput = getByPlaceholderText(ADDRESS_INPUT_PLACEHOLDER_TEXT);
    const deleteButton = queryByText(DELETE_BUTTON_TEXT);
    const submitButton = getByText(SUBMIT_BUTTON_TEXT);

    expect(addWalletTitle).toBeDefined();
    expect(nameInput.props.value).toEqual(''); // it's empty
    expect(addressInput.props.value).toEqual(''); // it's empty
    expect(deleteButton).toBeNull();

    fireEvent.press(submitButton);

    expect(spy).not.toHaveBeenCalled(); // ie. it should be disabled
  });

  it('submits a new wallet correctly', () => {
    const route = makeRouteProps({
      name: Screens.editWallet,
    });
    const { getByText, getByPlaceholderText, spy } = mountComponent(
      <EditWallet route={route} />,
    );

    const name = 'Cash Stash';
    fireEvent.changeText(
      getByPlaceholderText(NAME_INPUT_PLACEHOLDER_TEXT),
      name,
    );

    const address = '12345678';
    fireEvent.changeText(
      getByPlaceholderText(ADDRESS_INPUT_PLACEHOLDER_TEXT),
      address,
    );

    fireEvent.press(getByText(SUBMIT_BUTTON_TEXT));

    expect(spy).toHaveBeenCalledWith(
      saveWallet({
        id: expect.any(String),
        name,
        address,
        dateAdded: MOCKED_MOMENT_ISO_STRING,
      }),
    );
  });

  it('navigates to the QRCode screen', () => {
    const route = makeRouteProps({
      name: Screens.editWallet,
    });
    const { getByText, spy } = mountComponent(<EditWallet route={route} />);

    fireEvent.press(getByText(QR_CODE_BUTTON_TEXT));

    expect(spy).toHaveBeenCalledWith(navigate(Screens.QRCodeScanner));
  });

  it('updates state with props from the QRCOde screen', () => {
    const walletAddress = '12345678';
    const route = makeRouteProps({
      name: Screens.editWallet,
      params: {
        address: walletAddress,
      },
    });
    const { getByPlaceholderText } = mountComponent(
      <EditWallet route={route} />,
    );

    expect(
      getByPlaceholderText(ADDRESS_INPUT_PLACEHOLDER_TEXT).props.value,
    ).toEqual(walletAddress);
  });

  it('renders an existing wallet correctly', () => {
    const wallet = makeWallet();
    const route = makeRouteProps({
      name: Screens.editWallet,
      params: {
        id: wallet.id,
        name: wallet.name,
        address: wallet.address,
      },
    });
    const { getByText, getByPlaceholderText, queryByText } = mountComponent(
      <EditWallet route={route} />,
    );
    const editWalletTitle = getByText('Edit Wallet');
    const nameInput = getByPlaceholderText(NAME_INPUT_PLACEHOLDER_TEXT);
    const addressInput = getByPlaceholderText(ADDRESS_INPUT_PLACEHOLDER_TEXT);
    const deleteButton = queryByText(DELETE_BUTTON_TEXT);

    expect(editWalletTitle).toBeDefined();
    expect(nameInput.props.value).toEqual(wallet.name);
    expect(addressInput.props.value).toEqual(wallet.address);
    expect(deleteButton).toBeDefined();
  });

  it('edits an existing wallet correctly', () => {
    const wallet = makeWallet();
    const route = makeRouteProps({
      name: Screens.editWallet,
      params: {
        id: wallet.id,
        name: wallet.name,
        address: wallet.address,
      },
    });
    const { getByText, getByPlaceholderText, spy } = mountComponent(
      <EditWallet route={route} />,
    );

    const newName = 'Cash Stash';
    fireEvent.changeText(
      getByPlaceholderText(NAME_INPUT_PLACEHOLDER_TEXT),
      newName,
    );

    const newAddress = '12345678';
    fireEvent.changeText(
      getByPlaceholderText(ADDRESS_INPUT_PLACEHOLDER_TEXT),
      newAddress,
    );

    fireEvent.press(getByText(SUBMIT_BUTTON_TEXT));

    expect(spy).toHaveBeenCalledWith(
      saveWallet({
        id: wallet.id,
        name: newName,
        address: newAddress,
        dateAdded: MOCKED_MOMENT_ISO_STRING,
      }),
    );
  });

  it('deletes an existing wallet correctly', () => {
    const wallet = makeWallet();
    const route = makeRouteProps({
      name: Screens.editWallet,
      params: {
        id: wallet.id,
        name: wallet.name,
        address: wallet.address,
      },
    });
    const { getByText, spy } = mountComponent(<EditWallet route={route} />);
    const deleteButton = getByText(DELETE_BUTTON_TEXT);

    fireEvent.press(deleteButton);

    expect(spy).toHaveBeenCalledWith(deleteWallet(wallet.id));
  });
});
