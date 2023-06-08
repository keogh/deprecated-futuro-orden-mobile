import React from 'react';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { Account } from './accountsModel';

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
            <View>
              <Text>{item.name}</Text>
              <Text>{item.balance}</Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}
