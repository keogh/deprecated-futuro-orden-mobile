import * as React from 'react';
import { ListItem } from '@rneui/themed';
import { Text, TouchableOpacity } from 'react-native';
import { Account } from './accountsModel';

type Props = {
  item: Account;
  onPress: () => void;
};

export default function AccountsListItem({ item, onPress }: Props) {
  const handlePress = React.useCallback(() => {
    onPress();
  }, [onPress]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Content right>
          <Text>
            {new Intl.NumberFormat('es-MX', {
              style: 'currency',
              currency: 'MXN',
            }).format(item.balance / 100)}
          </Text>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
}
