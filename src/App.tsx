/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NativeRouter, Route, Routes } from 'react-router-native';
import LoginScreen from './domain/Login/LoginScreen';
import AccountsScreen from './domain/Accounts/AccountsScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const safeAreaStyles = React.useMemo(
    () => ({
      flex: 1,
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }),
    [isDarkMode],
  );

  return (
    <NativeRouter>
      <SafeAreaView style={safeAreaStyles}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={safeAreaStyles.backgroundColor}
        />

        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/accounts" element={<AccountsScreen />} />
          <Route path="/" element={<AccountsScreen />} />
        </Routes>
      </SafeAreaView>
    </NativeRouter>
  );
}

export default App;
