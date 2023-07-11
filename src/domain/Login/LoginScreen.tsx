import React from 'react';
import { StyleSheet, View } from 'react-native';
import { login } from './loginModel';
import Storage from '../../utils/storage';
import { CURRENT_USER_STORAGE_KEY } from '../Session/contants';
import { CurrentUser } from '../Session/types';
import { AuthContext } from '../Auth/AuthProvider';
import { Input, Button, Text } from '@rneui/themed';

export default function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const { signIn } = React.useContext(AuthContext);

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
      await signIn({ userToken: currentUser.token });
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  }, [email, password, signIn]);

  return (
    <View style={{ backgroundColor: 'white', flex: 1, paddingTop: 32 }}>
      {loading && <Text>Loading</Text>}
      {error && <Text>ERROR! {error}</Text>}
      <Input
        onChangeText={setEmail}
        value={email}
        label="Email address"
        keyboardType="email-address"
      />
      <Input
        onChangeText={setPassword}
        value={password}
        label="Password"
        secureTextEntry
      />
      <Button
        title="Login"
        onPress={handlePress}
        containerStyle={styles.loginButton}
      />
      <View style={styles.actionsContainer}>
        <Text style={styles.link}>Crea una cuenta</Text>
        <Text style={styles.link}>¿Olvidaste tu password?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    paddingHorizontal: 8,
  },
  actionsContainer: {
    padding: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 12,
  },
  link: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
