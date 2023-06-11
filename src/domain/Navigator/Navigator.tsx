import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../Login/LoginScreen';
import AccountsScreen from '../Accounts/AccountsScreen';
import { AppTabParamList, RootStackParamsList } from './types';
import { ACCOUNTS, APP, DASHBOARD, LOGIN } from './contants';
import DashboardScreen from '../Dashboard/DashboardScreen';
import { useCurrentUser } from '../Session/hooks/useCurrentUser';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator<AppTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamsList>();

export default function Navigator() {
  const { currentUser, loading, error } = useCurrentUser(true);

  const isSignedIn = React.useMemo(() => {
    return currentUser && !loading && !error;
  }, [loading, currentUser, error]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: !isSignedIn }}>
      {isSignedIn ? (
        <Stack.Screen name={APP} component={AppNavigator} />
      ) : (
        <Stack.Screen name={LOGIN} component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}

function AppNavigator() {
  return (
    <Tab.Navigator initialRouteName={DASHBOARD}>
      <Tab.Screen name={DASHBOARD} component={DashboardScreen} />
      <Tab.Screen name={ACCOUNTS} component={AccountsScreen} />
    </Tab.Navigator>
  );
}
