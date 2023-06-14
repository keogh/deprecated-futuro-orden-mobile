import Storage from '../../utils/storage';
import { CurrentUser } from '../Session/types';
import { CURRENT_USER_STORAGE_KEY } from '../Session/contants';
import { DASHBOARD_API_ROUTE } from '../Routes/api';

export type AccountBalances = {
  name: string;
  balance: number;
  balance_in_percent: number;
};

export type Dashboard = {
  automatic_account: string;
  total_balance: number;
  account_balances: AccountBalances[];
};

export async function fetchDashboard(): Promise<Dashboard> {
  const currentUser = await Storage.getData<CurrentUser>(
    CURRENT_USER_STORAGE_KEY,
  );

  if (!currentUser?.token) {
    throw new Error('Unauthorized user.');
  }

  // TODO: Abstract all API calls
  const response = await fetch(DASHBOARD_API_ROUTE, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${currentUser.token}`,
    },
  });
  return await response.json();
}
