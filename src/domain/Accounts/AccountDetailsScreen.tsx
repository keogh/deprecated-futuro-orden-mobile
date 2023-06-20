import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from '@rneui/themed';
import { AccountsStackScreenProps } from '../Navigator/types';
import { fetchAccountDetails } from './accountsModel';
import { moneyFormat } from '../../utils/money';
import BalanceHistoryChart from './BalanceHistoryChart';
import { AccountDetails } from './types';

export default function AccountDetailsScreen({
  route,
}: AccountsStackScreenProps<'AccountDetails'>) {
  const { accountId } = route.params;
  const [account, setAccount] = React.useState<AccountDetails | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function getData() {
      try {
        const data = await fetchAccountDetails(accountId);
        setAccount(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
          return;
        }
        throw e;
      }
    }
    getData();
  }, [accountId]);

  if (error) {
    return (
      <View>
        <Text>There was an error...</Text>
      </View>
    );
  }

  if (!account) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <View>
        <Card>
          <Text h1 style={styles.cardTitle}>
            {account.name}
          </Text>
          <Text h3>{moneyFormat(account.balance / 100)}</Text>
        </Card>
      </View>

      <BalanceHistoryChart balances={account.historical} />
    </View>
  );
}

const styles = StyleSheet.create({
  cardTitle: {
    paddingBottom: 16,
  },
});
