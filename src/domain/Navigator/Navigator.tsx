import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../Login/LoginScreen';
import AccountsScreen from '../Accounts/AccountsScreen';
import {
  AccountsStackParamList,
  AppTabParamList,
  RootStackParamsList,
} from './types';
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
import { Icon } from '@rneui/themed';

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
  tabBarIcon: ({ color }: { color: string }) => (
    <Icon name="account-balance-wallet" color={color} />
  ),
};

const DASHBOARD_TAB_OPTIONS = {
  tabBarIcon: ({ color }: { color: string }) => (
    <Icon name="dashboard" color={color} />
  ),
};

const LOGOUT_TAB_OPTIONS = {
  tabBarIcon: ({ color }: { color: string }) => (
    <Icon name="logout" color={color} />
  ),
};

function AppNavigator() {
  return (
    <Tab.Navigator initialRouteName={DASHBOARD}>
      <Tab.Screen
        name={DASHBOARD}
        component={DashboardScreen}
        options={DASHBOARD_TAB_OPTIONS}
      />
      <Tab.Screen
        name={ACCOUNTS_STACK}
        component={AccountsStack}
        options={ACCOUNTS_STACK_SCREEN_OPTIONS}
      />
      <Tab.Screen
        name={LOGOUT}
        component={LogoutScreen}
        options={LOGOUT_TAB_OPTIONS}
      />
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
