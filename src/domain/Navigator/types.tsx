import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootStackParamsList = {
  App: NavigatorScreenParams<AppTabParamList>;
  Login: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamsList> =
  NativeStackScreenProps<RootStackParamsList, T>;

export type AppTabParamList = {
  Dashboard: undefined;
  Accounts: undefined;
};

export type AppTabScreenProps<T extends keyof AppTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<AppTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamsList>
  >;
