import * as React from 'react';
import { View } from 'react-native';
import { Text } from '@rneui/themed';
import { AccountsStackScreenProps } from '../Navigator/types';
import { Account, fetchAccountDetails } from './accountsModel';

export default function AccountDetailsScreen({
  route,
}: AccountsStackScreenProps<'AccountDetails'>) {
  const { accountId } = route.params;
  const [account, setAccount] = React.useState<Account | null>(null);
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
        <Text h4>{account.name}</Text>
      </View>
      <View></View>
    </View>
  );
}
