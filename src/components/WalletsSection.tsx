import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { RHYTHM } from '../constants';
import { navigate, Screens } from '../Router';
import { setSelectedWalletId } from '../store/actions';
import { WalletData } from '../store/wallets/models';
import {
  selectSelectedWalletId,
  selectWallets,
} from '../store/wallets/selectors';
import { getTimeSince } from '../utils/getTimeSince';
import { sortArrayOfObjectsByKey } from '../utils/sortArrayOfObjectsByKey';
import Button, { ButtonKinds } from './Button';
import { Table, Column } from './Table';

const COLUMNS: Column[] = [
  {
    label: 'Name',
    style: {
      flex: 0.75,
    },
  },
  {
    label: 'Address',
    style: {
      flex: 1,
    },
  },
  {
    label: 'Date',
    style: {
      flex: 1,
    },
  },
  {
    label: '',
    style: {
      flex: 1,
    },
  },
];

const WalletsSectionContainer = styled.View`
  flex: 1;
`;

const WalletSectionTableContainer = styled.View`
  flex: 1;
  margin-bottom: ${RHYTHM}px;
`;

const WalletsSectionButtonContainer = styled.View`
  align-items: center;
`;

const WalletSectionSelectButtonContainer = styled.View``;

interface WalletSectionTableProps {
  wallets: WalletProps[];
  selectedWalletText: string;
  onSelectWallet: (wallet: WalletData) => void;
}

export const WalletsSectionTable = ({
  wallets,
  selectedWalletText,
  onSelectWallet,
}: WalletSectionTableProps) => {
  const rows = wallets.map((wallet) => {
    const isSelected = wallet.isSelected;
    const isEditable = wallet.isEditable;

    return {
      id: wallet.id,
      cells: [
        {
          label: wallet.name,
        },
        {
          label: wallet.address,
        },
        {
          label: getTimeSince(wallet.dateAdded),
        },
        {
          label: '',
          children: (
            <WalletSectionSelectButtonContainer
              key={`${wallet.id}-button`} // apparently this needs a key
              style={COLUMNS[COLUMNS.length - 1].style}>
              <Button
                kind={
                  isSelected ? ButtonKinds.accentFilled : ButtonKinds.accent
                }
                onPress={() => onSelectWallet(wallet)}
                small>
                {isEditable
                  ? 'EDIT'
                  : isSelected
                  ? selectedWalletText
                  : 'SELECT'}
              </Button>
            </WalletSectionSelectButtonContainer>
          ),
        },
      ],
      style: {
        borderTopWidth: 3,
        borderBottomWidth: 3,
        borderColor: isSelected ? colors.primary : 'transparent',
      },
    };
  });

  return (
    <Table
      title="My Wallets"
      columns={COLUMNS}
      rows={rows}
      paddingHorizontal={RHYTHM}
    />
  );
};

interface WalletProps extends WalletData {
  isSelected: boolean;
  isEditable: boolean;
}

interface WalletsSectionBaseProps {
  wallets: WalletProps[];
  onSelectWallet: (wallet: WalletData) => void;
  onAddWallet: () => void;
}

const WalletsSectionBase = ({
  wallets,
  onSelectWallet,
  onAddWallet,
}: WalletsSectionBaseProps) => {
  const hasWallets = wallets.length;

  return (
    <WalletsSectionContainer>
      {hasWallets ? (
        <WalletSectionTableContainer>
          <WalletsSectionTable
            wallets={wallets}
            selectedWalletText="EDIT"
            onSelectWallet={onSelectWallet}
          />
        </WalletSectionTableContainer>
      ) : null}

      <WalletsSectionButtonContainer>
        <Button kind={ButtonKinds.accent} onPress={onAddWallet}>
          ADD WALLET
        </Button>
      </WalletsSectionButtonContainer>
    </WalletsSectionContainer>
  );
};

interface WalletsSectionProps {}

export const WalletsSection = ({}: WalletsSectionProps) => {
  const dispatch = useDispatch();
  const selectedWalletId = useSelector(selectSelectedWalletId);
  const wallets = useSelector(selectWallets);
  const walletsArray = sortArrayOfObjectsByKey(
    Object.keys(wallets).map((id) => {
      const isSelected = Boolean(id === selectedWalletId);
      const isEditable = isSelected;

      return {
        ...wallets[id],
        isSelected,
        isEditable,
      };
    }),
    'dateAdded',
    true,
  );

  const onSelectWallet = useCallback(
    (wallet: WalletData) => {
      // if the wallet is the selected wallet id, the user wants to edit it
      if (wallet.id === selectedWalletId) {
        navigate(Screens.editWallet, wallet);
      } else {
        dispatch(setSelectedWalletId(wallet.id));
      }
    },
    [dispatch, selectedWalletId],
  );

  const onAddWallet = useCallback(() => {
    navigate(Screens.editWallet);
  }, []);

  return (
    <WalletsSectionBase
      wallets={walletsArray}
      onSelectWallet={onSelectWallet}
      onAddWallet={onAddWallet}
    />
  );
};
