/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Navigator from './domain/Navigator/Navigator';
import AuthProvider from './domain/Auth/AuthProvider';

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
    <SafeAreaView style={safeAreaStyles}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={safeAreaStyles.backgroundColor}
      />

      <AuthProvider>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaView>
  );
}

export default App;
