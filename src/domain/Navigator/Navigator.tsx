import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../Login/LoginScreen';
import AccountsScreen from '../Accounts/AccountsScreen';
import { AccountsStackParamList, AppTabParamList, RootStackParamsList } from './types';
import {
  ACCOUNT_DETAILS,
  ACCOUNTS,
  ACCOUNTS_STACK,
  APP,
  DASHBOARD,
  LOGIN,
  LOGOUT,
} from './contants';
import DashboardScreen from '../Dashboard/DashboardScreen';
import { AuthContext } from '../Auth/AuthProvider';
import LogoutScreen from '../Auth/LogoutScreen';
import AccountDetailsScreen from '../Accounts/AccountDetailsScreen';

const Tab = createBottomTabNavigator<AppTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamsList>();
const AStack = createNativeStackNavigator<AccountsStackParamList>();

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

const ACCOUNTS_STACK_SCREEN_OPTIONS = {
  headerShown: false,
  tabBarLabel: 'Accounts',
};

function AppNavigator() {
  return (
    <Tab.Navigator initialRouteName={DASHBOARD}>
      <Tab.Screen name={DASHBOARD} component={DashboardScreen} />
      <Tab.Screen
        name={ACCOUNTS_STACK}
        component={AccountsStack}
        options={ACCOUNTS_STACK_SCREEN_OPTIONS}
      />
      <Tab.Screen name={LOGOUT} component={LogoutScreen} />
    </Tab.Navigator>
  );
}

function AccountsStack() {
  return (
    <AStack.Navigator>
      {/* TODO: Fix types and remove @ts-ignore */}
      {/* @ts-ignore */}
      <AStack.Screen name={ACCOUNTS} component={AccountsScreen} />
      {/* @ts-ignore */}
      <AStack.Screen name={ACCOUNT_DETAILS} component={AccountDetailsScreen} />
    </AStack.Navigator>
  );
}
