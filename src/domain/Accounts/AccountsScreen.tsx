import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Account, fetchAccounts } from './accountsModel';
import AccountsListItem from './AccountsListItem';
import { ACCOUNT_DETAILS, ACCOUNTS_STACK, APP } from '../Navigator/contants';
import { AppTabScreenProps } from '../Navigator/types';

export default function AccountsScreen({
  navigation,
}: AppTabScreenProps<'AccountsStack'>) {
  const [accounts, setAccounts] = React.useState<Account[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchAccounts();
        setAccounts(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    }
    fetchData();
  }, []);

  const handlePressItem = React.useCallback(
    (accountId: Account['id']) => {
      navigation.navigate(APP, {
        screen: ACCOUNTS_STACK,
        params: {
          screen: ACCOUNT_DETAILS,
          params: {
            accountId: accountId,
          },
        },
      });
    },
    [navigation],
  );

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={accounts}
        renderItem={({ item }) => (
          <AccountsListItem item={item} onPress={handlePressItem} />
        )}
      />
    </View>
  );
}
