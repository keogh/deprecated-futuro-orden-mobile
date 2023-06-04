import React from 'react';
import Storage from '../../../utils/storage';
import { CURRENT_USER_STORAGE_KEY } from '../contants';
import { useNavigate } from 'react-router-native';
import { LOGIN_ROUTE } from '../../../utils/routes';

import type { CurrentUser } from '../types';

export function useCurrentUser(required = false) {
  const [loading, setLoading] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState<CurrentUser>(null);
  const [error, setError] = React.useState<string | null>(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    async function getCurrentUser() {
      try {
        setLoading(true);
        const data = await Storage.getData<CurrentUser>(
          CURRENT_USER_STORAGE_KEY,
        );
        setCurrentUser(data);

        if (required && data === null) {
          return navigate(LOGIN_ROUTE);
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }

    getCurrentUser();
  }, [required, navigate]);

  return {
    loading,
    currentUser,
    error,
  };
}
