import React, { ReactNode, useCallback } from 'react';
import { FlatList, StyleProp, TextStyle, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { RHYTHM } from '../constants';
import { AnimatedNumber } from './AnimatedNumber';
import { HeadingText } from './HeadingText';
import { SmallText } from './SmallText';

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

const notLastCellStyles: TextStyle = {
  textAlign: 'left',
  marginRight: RHYTHM / 4,
};

const lastCellStyles: TextStyle = {
  textAlign: 'right',
};

export interface Cell {
  label: string;
  children?: ReactNode;
  style?: StyleProp<TextStyle>;
  shouldAnimate?: boolean;
}

export interface Row {
  id: string;
  cells: Cell[];
  style?: StyleProp<TextStyle>;
}

export interface Column {
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
}

export const Table = ({
  title,
  columns,
  rows,
  paddingHorizontal = 0,
  children,
  style,
}: TableProps) => {
  const renderRow = useCallback(
    ({ item: row, index: rowIndex }: { item: Row; index: number }) => {
      const hasBackground = Boolean(rowIndex % 2 === 0);

      return (
        <TableRowContainer
          key={row.id}
          paddingHorizontal={paddingHorizontal}
          style={[
            hasBackground
              ? { backgroundColor: colors.veryLightTransWhite }
              : {},
            row.style,
          ]}>
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
                  {cell.shouldAnimate ? (
                    <AnimatedNumber>{cell.label}</AnimatedNumber>
                  ) : (
                    cell.label
                  )}
                </SmallText>
              )
            );
          })}
        </TableRowContainer>
      );
    },
    [columns, paddingHorizontal],
  );

  return (
    <TableContainer style={style}>
      <TableTitleContainer>
        <HeadingText>{title}</HeadingText>
      </TableTitleContainer>

      <TableRowContainer paddingHorizontal={paddingHorizontal}>
        {columns.map((column, columnIndex) => {
          const isLastCell = columnIndex === columns.length - 1;

          return (
            <SmallText
              key={column.label}
              center
              bold
              style={[
                isLastCell ? lastCellStyles : notLastCellStyles,
                column.style,
              ]}>
              {column.label}
            </SmallText>
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
