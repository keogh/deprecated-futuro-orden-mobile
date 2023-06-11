import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { login } from './loginModel';
import Storage from '../../utils/storage';
import { CURRENT_USER_STORAGE_KEY } from '../Session/contants';
import { CurrentUser } from '../Session/types';
import { RootStackScreenProps } from '../Navigator/types';

export default function LoginScreen({
  navigation,
}: RootStackScreenProps<'Login'>) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handlePress = React.useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await login({
        email,
        password,
      });

      const currentUser: CurrentUser = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        token: response.token,
      };
      await Storage.storeData(CURRENT_USER_STORAGE_KEY, currentUser);

      // navigation.navigate('App', {
      //   screen: 'Accounts',
      // });
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  }, [email, password]);

  return (
    <View>
      <Text>Login</Text>
      {loading && <Text>Loading</Text>}
      {error && <Text>ERROR! {error}</Text>}
      <TextInput
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Login" onPress={handlePress} />
    </View>
  );
}
