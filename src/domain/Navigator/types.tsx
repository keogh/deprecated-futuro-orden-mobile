import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootGuestStackParamsList = {
  Login: undefined;
};

export type RootSignedInStackParamsList = {
  App: NavigatorScreenParams<AppTabParamList>;
};

export type RootStackParamsList = {
  Login?: undefined;
  App?: NavigatorScreenParams<AppTabParamList>;
};

export type RootGuestStackScreenProps<
  T extends keyof RootGuestStackParamsList,
> = NativeStackScreenProps<RootGuestStackParamsList, T>;

export type RootSignInStackScreenProps<
  T extends keyof RootSignedInStackParamsList,
> = NativeStackScreenProps<RootSignedInStackParamsList, T>;

export type AppTabParamList = {
  Dashboard: undefined;
  AccountsStack: NavigatorScreenParams<AccountsStackParamList>;
  Logout: undefined;
};

export type AppTabScreenProps<T extends keyof AppTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<AppTabParamList, T>,
    RootSignInStackScreenProps<keyof RootSignedInStackParamsList>
  >;

export type AccountsStackParamList = {
  Accounts: undefined;
  AccountDetails: { accountId: number | string };
};

export type AccountsStackScreenProps<T extends keyof AccountsStackParamList> =
  NativeStackScreenProps<AccountsStackParamList, T>;
