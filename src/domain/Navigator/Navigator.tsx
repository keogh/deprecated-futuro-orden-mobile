import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../Login/LoginScreen';
import AccountsScreen from '../Accounts/AccountsScreen';
import { AppTabParamList, RootStackParamsList } from './types';
import { ACCOUNTS, APP, DASHBOARD, LOGIN } from './contants';
import DashboardScreen from '../Dashboard/DashboardScreen';
import { AuthContext } from '../Auth/AuthProvider';

const Tab = createBottomTabNavigator<AppTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamsList>();

export default function Navigator() {
  const { userToken } = React.useContext(AuthContext);
  const isSignedIn = !!userToken;

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
