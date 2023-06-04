import Storage from '../../utils/storage';
import { CurrentUser } from '../Session/types';
import { CURRENT_USER_STORAGE_KEY } from '../Session/contants';
import { ACCOUNTS_API_ROUTE } from '../Routes/api';

export type Account = {
  id: number;
  name: string;
  balance: number;
  createdAt: string;
  userId: number;
};

export async function fetchAccounts(): Promise<Account[]> {
  const currentUser = await Storage.getData<CurrentUser>(
    CURRENT_USER_STORAGE_KEY,
  );

  if (!currentUser?.token) {
    throw new Error('Unauthorized user.');
  }

  // TODO: Abstract all API calls
  const response = await fetch(ACCOUNTS_API_ROUTE, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${currentUser.token}`,
    },
  });
  return await response.json();
}
