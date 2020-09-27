import React, { useCallback } from 'react';
import { FlatList, StyleProp, TextStyle } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { dimensions } from '../dimensions';
import { HeadingText } from './HeadingText';

const TableContainer = styled.View`
  flex: 1;
`;

const TableTitleContainer = styled.View`
  align-items: center;
  margin-bottom: ${dimensions.rhythm / 2}px;
  padding: ${dimensions.rhythm / 2}px 0 0;
`;

const ROW_HZ_PADDING = dimensions.rhythm / 2;

const TableRowContainer = styled.View`
  flex-direction: row;
  padding: ${dimensions.rhythm / 2}px ${ROW_HZ_PADDING}px;
`;

const TableHeaderText = styled.Text`
  font-family: 'Recursive-Bold';
  font-size: 12px;
  color: ${colors.white};
`;

const TableCellText = styled.Text`
  font-family: 'Recursive-Regular';
  font-size: 12px;
  color: ${colors.white};
`;

export interface Column {
  label: string;
  style?: StyleProp<TextStyle>;
}

export interface Cell {
  label: string;
  style?: StyleProp<TextStyle>;
}

export interface Row {
  id: string;
  cells: Cell[];
  style?: StyleProp<TextStyle>;
}

interface TableProps {
  title: string;
  columns: Column[];
  rows: Row[];
}

export const Table = ({ title, columns, rows }: TableProps) => {
  const renderRow = useCallback(
    ({ item: row, index: rowIndex }: { item: Row; index: number }) => {
      return (
        <TableRowContainer
          key={row.id}
          style={[
            rowIndex % 2 === 0
              ? { backgroundColor: colors.veryLightTransWhite }
              : {},
            row.style,
          ]}>
          {row.cells.map((cell, columnIndex) => (
            <TableCellText
              key={`${cell.label}${columnIndex}`}
              style={[columns[columnIndex].style, cell.style]}>
              {cell.label}
            </TableCellText>
          ))}
        </TableRowContainer>
      );
    },
    [columns],
  );

  return (
    <TableContainer>
      <TableTitleContainer>
        <HeadingText>{title}</HeadingText>
      </TableTitleContainer>

      <TableRowContainer>
        {columns.map((column) => (
          <TableHeaderText key={column.label} style={column.style}>
            {column.label}
          </TableHeaderText>
        ))}
      </TableRowContainer>

      <FlatList
        data={rows}
        keyExtractor={(row) => row.id}
        renderItem={renderRow}
        style={{ flex: 1 }}
      />
    </TableContainer>
  );
};
