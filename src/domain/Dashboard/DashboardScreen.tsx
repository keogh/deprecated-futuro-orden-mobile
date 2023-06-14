import React from 'react';
import { Text, View } from 'react-native';
import { VictoryPie, VictoryTheme, VictoryTooltip } from 'victory-native';
import { fetchAccounts } from '../Accounts/accountsModel';
import { Dashboard, fetchDashboard } from './dashboardModel';

export default function DashboardScreen() {
  // const data = [
  //   { x: 'Cats', y: 35 },
  //   { x: 'Dogs', y: 40 },
  //   { x: 'Birds', y: 55 },
  // ];
  const [dashboardData, setDashboardData] = React.useState<Dashboard>();
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchDashboard();
        setDashboardData(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    }
    fetchData();
  }, []);

  const chartData = React.useMemo(() => {
    if (!dashboardData) {
      return [];
    }

    const balances = dashboardData['account_balances'];
    return balances
      .filter(balance => balance.balance > 0)
      .map(balance => ({
        x: balance.name,
        y: balance.balance_in_percent,
        balance: balance.balance,
      }));
  }, [dashboardData]);

  return (
    <View style={{ flex: 1 }}>
      {error && (
        <View>
          <Text>{error}</Text>
        </View>
      )}

      <VictoryPie
        data={chartData}
        labels={({ datum }) => `${datum.x}\n${datum.balance}`}
        labelComponent={<VictoryTooltip />}
        theme={VictoryTheme.material}
      />
    </View>
  );
}
