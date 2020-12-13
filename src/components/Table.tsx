import React, { ReactNode, useCallback } from 'react';
import {
  FlatList,
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import { RHYTHM } from '../constants';
import { HeadingText } from './HeadingText';
import { SmallText } from './SmallText';
import ArrowUpIcon from '../icons/arrow-up.svg';
import ArrowDownIcon from '../icons/arrow-down.svg';
import { colors } from '../colors';

const TableContainer = styled.View`
  flex: 1;
`;

const TableTitleContainer = styled.View`
  align-items: center;
  margin-bottom: ${RHYTHM / 2}px;
  padding: ${RHYTHM / 2}px 0 0;
`;

interface TableRowContainerProps {
  paddingHorizontal?: number;
}

const TableRowContainer = styled.View<TableRowContainerProps>`
  flex-direction: row;
  padding: ${({ paddingHorizontal = 0 }) =>
    `${RHYTHM / 2}px ${paddingHorizontal}px`};
`;

const ARROW_SIZE = 15;

const SortArrowsContainer = styled.View`
  margin-right: -5px;
`;

const firstCellStyles: TextStyle = {
  textAlign: 'left',
  marginRight: RHYTHM / 4,
};

const notLastCellStyles: TextStyle = {
  ...firstCellStyles,
  justifyContent: 'center',
};

const lastCellStyles: TextStyle = {
  textAlign: 'right',
  justifyContent: 'flex-end',
};

export interface Cell {
  label: string;
  children?: ReactNode;
  style?: StyleProp<TextStyle>;
}

export interface Row {
  id: string;
  cells: Cell[];
  style?: StyleProp<TextStyle>;
}

export interface Column {
  key: string;
  label: string;
  style?: StyleProp<TextStyle>;
}

interface TableProps {
  title: string;
  columns: Column[];
  rows: Row[];
  paddingHorizontal?: number;
  collapsed?: boolean; // only render rows
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  sortByKey?: string;
  reverseSort?: boolean;
  onTableHeaderPress?: (key: string) => void;
}

export const Table = ({
  title,
  columns,
  rows,
  paddingHorizontal = 0,
  children,
  style,
  sortByKey,
  reverseSort,
  onTableHeaderPress,
}: TableProps) => {
  const renderRow = useCallback(
    ({ item: row, index: rowIndex }: { item: Row; index: number }) => {
      const isEvenRow = Boolean(rowIndex % 2 === 0);

      return (
        <TableRowContainer
          key={row.id}
          paddingHorizontal={paddingHorizontal}
          style={[isEvenRow ? {} : {}, row.style]}>
          {row.cells.map((cell, columnIndex) => {
            const isLastCell = columnIndex === row.cells.length - 1;

            return (
              cell.children || (
                <SmallText
                  key={`${cell.label}${columnIndex}`}
                  center
                  style={[
                    isLastCell ? lastCellStyles : notLastCellStyles,
                    columns[columnIndex].style,
                    cell.style,
                  ]}
                  numberOfLines={1}>
                  {cell.label}
                </SmallText>
              )
            );
          })}
        </TableRowContainer>
      );
    },
    [columns, paddingHorizontal],
  );

  const handleTableHeaderPress = useCallback(
    (key: string) => {
      if (onTableHeaderPress) {
        onTableHeaderPress(key);
      }
    },
    [onTableHeaderPress],
  );

  return (
    <TableContainer style={style}>
      <TableTitleContainer>
        <HeadingText>{title}</HeadingText>
      </TableTitleContainer>

      <TableRowContainer paddingHorizontal={paddingHorizontal}>
        {columns.map((column, columnIndex) => {
          const isSortedColumn = column.key === sortByKey;
          const isFirstCell = columnIndex === 0;
          const isLastCell = columnIndex === columns.length - 1;
          const headerCellStyle = [
            isFirstCell
              ? firstCellStyles
              : isLastCell
              ? lastCellStyles
              : notLastCellStyles,
            column.style,
            { flexDirection: 'row' },
          ];

          return (
            <TouchableOpacity
              key={column.label}
              // @ts-expect-error
              style={headerCellStyle}
              onPress={() => handleTableHeaderPress(column.key)}>
              <SmallText center bold>
                {column.label}
              </SmallText>

              <SortArrowsContainer>
                <ArrowUpIcon
                  width={ARROW_SIZE}
                  height={ARROW_SIZE}
                  fill={
                    isSortedColumn
                      ? reverseSort
                        ? colors.transWhite
                        : colors.white
                      : ''
                  }
                  style={{ marginBottom: ARROW_SIZE / -2 }}
                />
                <ArrowDownIcon
                  width={ARROW_SIZE}
                  height={ARROW_SIZE}
                  fill={
                    isSortedColumn
                      ? reverseSort
                        ? colors.white
                        : colors.transWhite
                      : ''
                  }
                />
              </SortArrowsContainer>
            </TouchableOpacity>
          );
        })}
      </TableRowContainer>

      {rows.length ? (
        <FlatList
          data={rows}
          keyExtractor={(row) => row.id}
          renderItem={renderRow}
        />
      ) : (
        children
      )}
    </TableContainer>
  );
};
