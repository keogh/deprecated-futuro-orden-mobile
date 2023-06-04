import React from 'react';
import { Button, ScrollView, Text } from 'react-native';
import { useCurrentUser } from '../Session/hooks/useCurrentUser';
import Storage from '../../utils/storage';
import { CURRENT_USER_STORAGE_KEY } from '../Session/contants';
import { useNavigate } from 'react-router-native';
import { ROOT_ROUTE } from '../../utils/routes';
import { Account, fetchAccounts } from './accountsModel';
import { Table, Row } from 'react-native-reanimated-table';

const TABLE_HEADERS = ['ID', 'NAME', 'Total', 'Actions'];

export default function AccountsScreen() {
  const { currentUser } = useCurrentUser(true);
  const navigate = useNavigate();

  const [accounts, setAccounts] = React.useState<Account[]>([]);
  const [error, setError ] = React.useState<string | null>(null);

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
    <ScrollView>
      <Text>Accounts</Text>
      <Table>
        <Row data={TABLE_HEADERS} />
        {accounts.map(account => {
          const formattedData = [account.id, account.name, account.balance];
          return <Row key={`account-${account.id}`} data={formattedData} />;
        })}
      </Table>

      {/* TODO: Remove Temporary logout button soon */}
      <Button title="Clear Token" onPress={handleClick} />
    </ScrollView>
  );
}
