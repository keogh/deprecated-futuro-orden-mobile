import React from 'react';
import { ScrollView, Text } from 'react-native';
import { useCurrentUser } from '../Session/hooks/useCurrentUser';

export default function AccountsScreen() {
  const { currentUser } = useCurrentUser(true);

  if (currentUser === null) {
    return null;
  }

  return (
    <ScrollView>
      <Text>Accounts</Text>
    </ScrollView>
  );
}
