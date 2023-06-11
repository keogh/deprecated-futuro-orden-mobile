import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Account } from './accountsModel';
import { ListItem } from '@rneui/themed';
import { Text } from 'react-native';

interface Props {
  accounts: Account[];
}
export default function AccountsList({ accounts }: Props) {
  return (
    <FlatList
      data={accounts}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity>
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
      }}
    />
  );
}
