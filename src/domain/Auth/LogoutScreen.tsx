import * as React from 'react';
import { AuthContext } from './AuthProvider';
import { Text, View } from 'react-native';

export default function LogoutScreen() {
  const { signOut } = React.useContext(AuthContext);

  React.useEffect(() => {
    (async function () {
      await signOut();
    })();
  }, [signOut]);

  return (
    <View style={{ flex: 1 }}>
      <Text>Logging out...</Text>
    </View>
  );
}
