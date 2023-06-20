import { VictoryZoomContainerNativeProps } from 'victory-native/src/components/victory-zoom-container';

export type ChartItem = {
  x: number;
  y: number;
};

export type ChartData = {
  data: ChartItem[];
  tickValues: string[];
  zoomDomain: VictoryZoomContainerNativeProps['zoomDomain'];
};

export type Account = {
  id: number | string;
  name: string;
  balance: number;
  createdAt: string;
  userId: number;
};

export type AccountDetails = {
  id: Account['id'];
  name: string;
  balance: number;
  movements?: [];
  historical: AccountDetailsHistorical[];
};

export type AccountDetailsHistorical = {
  id: number;
  when: string;
  balance: number;
};
