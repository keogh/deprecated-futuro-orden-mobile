import * as React from 'react';
import { View } from 'react-native';
import { Text } from '@rneui/themed';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryZoomContainer,
} from 'victory-native';
import { addDays, format } from 'date-fns';
import type { ChartData, ChartItem } from './types';
import { AccountDetailsHistorical } from './types';

type Props = {
  balances: AccountDetailsHistorical[];
};

const DEFAULT_CHART_DATA = {
  data: [],
  tickValues: [],
  zoomDomain: {},
};

export default function BalanceHistoryChart({ balances }: Props) {
  const chartData: ChartData = React.useMemo(() => {
    if (balances.length === 0) {
      return DEFAULT_CHART_DATA;
    }

    const data: ChartItem[] = [];
    const tickValues: string[] = [];
    const zoomDomain: ChartData['zoomDomain'] = {
      x: [0, 0],
    };

    balances.forEach((item, i) => {
      const itemDate = new Date(item.when);
      const timestamp = itemDate.getTime();

      data.push({
        x: timestamp,
        y: item.balance / 100,
      });

      tickValues.push(itemDate.toString());

      if (i === 0) {
        zoomDomain.x = [timestamp, addDays(new Date(timestamp), 7).getTime()];
      }
    });

    return {
      data,
      tickValues,
      zoomDomain,
    };
  }, [balances]);

  return (
    <View>
      <View>
        <Text>{balances.length}</Text>
      </View>
      <View>
        <VictoryChart
          theme={VictoryTheme.material}
          containerComponent={
            <VictoryZoomContainer zoomDomain={chartData.zoomDomain} />
          }
        >
          <VictoryLine data={chartData.data} />
          <VictoryAxis
            // tickLabelComponent={<VictoryLabel angle={-45} textAnchor="end" />}
            tickFormat={t => format(new Date(t), 'd/M/yy')}
            // tickValues={chartData.tickValues}
          />
          <VictoryAxis dependentAxis />
        </VictoryChart>
      </View>
    </View>
  );
};
