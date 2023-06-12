import React from 'react';
import { Text, View } from 'react-native';
import { Account, fetchAccounts } from './accountsModel';
import AccountsList from './AccountsList';

export default function AccountsScreen() {
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

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <AccountsList accounts={accounts} />
    </View>
  );
}
