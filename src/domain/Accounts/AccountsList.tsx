import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Account } from './accountsModel';
import { ListItem } from '@rneui/themed';

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
            <ListItem>
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Content right>
                <ListItem.Title>{item.balance}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
        );
      }}
    />
  );
}
