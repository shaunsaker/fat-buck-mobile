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
  padding: 0 ${RHYTHM}px;
  margin-top: -${RHYTHM}px;
`;

const Row = styled.View`
  flex-direction: row;
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
}

interface TradesGraphBaseProps {
  data: Datum[];
  trendlineData: Datum[];
}

const TradesGraphBase = ({ data, trendlineData }: TradesGraphBaseProps) => {
  return (
    <Background>
      <HeaderBar showClose />

      <PageHeader>Trades Graph</PageHeader>

      <TradesGraphContainer>
        <Row>
          <YAxis
            data={data.map(({ value }) => value)}
            contentInset={CONTENT_INSET}
            style={{}}
            svg={{ fontFamily: FONT_REGULAR, fill: colors.white }}
            numberOfTicks={8}
          />

          <View>
            <BarChart
              data={data}
              yAccessor={({ item }) => item.value}
              contentInset={CONTENT_INSET}
              animate
              style={{ width: 360, height: 360 }}
              svg={{ stroke: colors.primary, strokeWidth: 2 }}>
              <Grid
                direction="HORIZONTAL"
                svg={{ stroke: colors.lightTransWhite }}
              />
            </BarChart>

            <LineChart
              data={trendlineData}
              yAccessor={({ item }) => item.value}
              contentInset={CONTENT_INSET}
              animate
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
              svg={{ stroke: colors.accent, strokeWidth: 2 }}
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
    date: moment(trade.closeTimestamp).toDate(),
    value: parseFloat(getTradeProfitPercentage(trade)),
  }));
  const { data: trendlineData } = getTrendlineData(data);

  return <TradesGraphBase data={data} trendlineData={trendlineData} />;
};
