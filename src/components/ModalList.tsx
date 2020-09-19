import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import Button, { ButtonKinds } from './Button';
import { FlatList } from 'react-native';

const ExchangeListItemContainer = styled.View`
  margin-top: 20px;
  align-items: center;
`;

interface ModalListProps {
  items: string[];
  selectedItem: string;
  handleSelectItem: (item: string) => void;
}

export const ModalList = ({
  items,
  selectedItem,
  handleSelectItem,
}: ModalListProps) => {
  const renderItem = useCallback(
    ({ item }) => {
      return (
        <ExchangeListItemContainer>
          <Button
            kind={
              selectedItem === item
                ? ButtonKinds.primary
                : ButtonKinds.secondary
            }
            onPress={() => handleSelectItem(item)}>
            {item}
          </Button>
        </ExchangeListItemContainer>
      );
    },
    [selectedItem, handleSelectItem],
  );

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item}
      renderItem={renderItem}
    />
  );
};
