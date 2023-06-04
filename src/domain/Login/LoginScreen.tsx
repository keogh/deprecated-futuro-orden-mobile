import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { login } from './loginModel';

export default function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handlePress = React.useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const user = await login({
        email,
        password,
      });
      console.log('User: ', user);
      // TODO: Store user
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
