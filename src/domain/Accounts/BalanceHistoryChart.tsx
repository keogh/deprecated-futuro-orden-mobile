import * as React from 'react';
import { View } from 'react-native';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
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
        zoomDomain.x = [timestamp, addDays(new Date(timestamp), 28).getTime()];
      }
    });

    return {
      data,
      tickValues,
      zoomDomain,
    };
  }, [balances]);

  return (
    <View style={{ marginTop: 8 }}>
      <View style={{ backgroundColor: 'white' }}>
        <VictoryChart
          height={140}
          padding={{ left: 8, right: 8, top: 20, bottom: 40 }}
        >
          <VictoryLine data={chartData.data} />
          <VictoryAxis tickFormat={t => format(new Date(t), 'd/M/yy')} />
          <VictoryAxis
            dependentAxis
            tickFormat={t => {
              if (t > 1000) {
                return `${Math.round(t / 1000)}k`;
              }
              return t;
            }}
            tickLabelComponent={<VictoryLabel dx={40} />}
            tickCount={2}
          />
        </VictoryChart>
      </View>
    </View>
  );
}
