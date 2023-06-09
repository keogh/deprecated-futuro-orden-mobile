import React from 'react';
import { Button, Text, View } from 'react-native';
import { useCurrentUser } from '../Session/hooks/useCurrentUser';
import Storage from '../../utils/storage';
import { CURRENT_USER_STORAGE_KEY } from '../Session/contants';
import { useNavigate } from 'react-router-native';
import { ROOT_ROUTE } from '../../utils/routes';
import { Account, fetchAccounts } from './accountsModel';
import AccountsList from './AccountsList';

export default function AccountsScreen() {
  const { currentUser } = useCurrentUser(true);
  const navigate = useNavigate();

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

  const handleClick = React.useCallback(async () => {
    try {
      await Storage.removeData(CURRENT_USER_STORAGE_KEY);
      return navigate(ROOT_ROUTE);
    } catch (e) {
      throw e;
    }
  }, [navigate]);

  if (currentUser === null) {
    return null;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Text>Accounts</Text>


      <AccountsList accounts={accounts} />

      {/* TODO: Remove Temporary logout button soon */}
      <Button title="Clear Token" onPress={handleClick} />
    </View>
  );
}
