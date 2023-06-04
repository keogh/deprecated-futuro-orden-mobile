import React from 'react';
import { Button, ScrollView, Text } from 'react-native';
import { useCurrentUser } from '../Session/hooks/useCurrentUser';
import Storage from '../../utils/storage';
import { CURRENT_USER_STORAGE_KEY } from '../Session/contants';
import { useNavigate } from 'react-router-native';
import { ROOT_ROUTE } from '../../utils/routes';

export default function AccountsScreen() {
  const { currentUser } = useCurrentUser(true);
  const navigate = useNavigate();

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

  return (
    <ScrollView>
      <Text>Accounts</Text>

      {/* TODO: Remove Temporary logout button soon */}
      <Button title="Clear Token" onPress={handleClick} />
    </ScrollView>
  );
}
