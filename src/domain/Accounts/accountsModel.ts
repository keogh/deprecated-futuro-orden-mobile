import Storage from '../../utils/storage';
import { CurrentUser } from '../Session/types';
import { CURRENT_USER_STORAGE_KEY } from '../Session/contants';
import { ACCOUNTS_API_ROUTE } from '../Routes/api';
import * as ErrorCodes from '../Errors/errorCodes';

export type Account = {
  id: number | string;
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
    throw new Error(ErrorCodes.UNAUTHORIZED_USER);
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

export async function fetchAccountDetails(
  accountId: Account['id'],
): Promise<Account> {
  const currentUser = await Storage.getData<CurrentUser>(
    CURRENT_USER_STORAGE_KEY,
  );

  if (!currentUser?.token) {
    throw new Error(ErrorCodes.UNAUTHORIZED_USER);
  }

  const response = await fetch(`${ACCOUNTS_API_ROUTE}/${accountId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${currentUser.token}`,
    },
  });

  if (response.status === 404) {
    throw new Error(ErrorCodes.NOT_FOUND);
  }

  return await response.json();
}
