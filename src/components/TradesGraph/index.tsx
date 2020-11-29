import React from 'react';
import styled from 'styled-components/native';
import {
  BarChart,
  Grid,
  LineChart,
  XAxis,
  YAxis,
} from 'react-native-svg-charts';
import { FONT_REGULAR, RHYTHM } from '../../constants';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { selectTrades } from '../../store/trades/selectors';
import { getTradeProfitPercentage } from '../../store/trades/utils';
import { ApplicationState } from '../../store/reducers';
import { colors } from '../../colors';
import { Background } from '../Background';
import { HeaderBar } from '../HeaderBar';
import { PageHeader } from '../PageHeader';
import { getTrendlineData } from '../../utils/getTrendlineData';
import { View } from 'react-native';

const TradesGraphContainer = styled.View`
  flex: 1;
  padding: 0 ${RHYTHM}px ${RHYTHM}px;
  margin-top: -${RHYTHM}px;
`;

const Row = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const YAxisLabel = styled.Text`
  font-size: 14px;
  font-family: ${FONT_REGULAR};
  color: ${colors.white};
  transform: rotate(-90deg);
  margin-left: -65px;
  margin-right: -55px;
`;

const CONTENT_INSET = {
  top: RHYTHM * 2,
  right: RHYTHM,
  bottom: RHYTHM * 2,
  left: RHYTHM,
};

interface Datum {
  date: Date;
  value: number;
  svg?: any; // FIXME: how to type this
}

interface TradesGraphBaseProps {
  data: Datum[];
  trendlineData: Datum[];
}

const TradesGraphBase = ({ data, trendlineData }: TradesGraphBaseProps) => {
  const dataWithStyles = data.map((datum) => ({
    ...datum,
    svg: { fill: datum.value >= 0 ? colors.success : colors.danger },
  }));

  return (
    <Background>
      <HeaderBar showClose />

      <PageHeader>Trades Graph</PageHeader>

      <TradesGraphContainer>
        <Row>
          <YAxisLabel>Profit Percentage (%)</YAxisLabel>

          <YAxis
            data={data.map(({ value }) => value)}
            contentInset={CONTENT_INSET}
            style={{}}
            svg={{ fontFamily: FONT_REGULAR, fill: colors.white }}
            numberOfTicks={8}
          />

          <View style={{ flex: 1 }}>
            <BarChart
              data={dataWithStyles}
              yAccessor={({ item }) => item.value}
              contentInset={CONTENT_INSET}
              style={{ flex: 1 }}>
              <Grid
                direction="HORIZONTAL"
                svg={{ stroke: colors.lightTransWhite }}
              />
            </BarChart>

            <LineChart
              data={trendlineData}
              yAccessor={({ item }) => item.value}
              contentInset={CONTENT_INSET}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
              svg={{ stroke: colors.white, strokeWidth: 2 }}
            />
          </View>
        </Row>

        <XAxis
          data={data}
          xAccessor={({ item }) => item.date}
          formatLabel={(value: Date) => moment(value).format('MMM D')}
          numberOfTicks={5}
          contentInset={CONTENT_INSET}
          style={{
            marginTop: -25,
          }}
          svg={{ fontFamily: FONT_REGULAR, fill: colors.white }}
        />
      </TradesGraphContainer>
    </Background>
  );
};

interface TradesGraphProps {}

export const TradesGraph = ({}: TradesGraphProps) => {
  const trades = useSelector((state: ApplicationState) =>
    selectTrades(state, true),
  );
  const data = trades.map((trade) => ({
    date: moment(trade.closeTimestamp || trade.openTimestamp).toDate(),
    value: parseFloat(getTradeProfitPercentage(trade)),
  }));
  const { data: trendlineData } = getTrendlineData(data);

  return <TradesGraphBase data={data} trendlineData={trendlineData} />;
};
