import React from 'react';
import Storage from '../../../utils/storage';
import { CURRENT_USER_STORAGE_KEY } from '../contants';

import type { CurrentUser } from '../types';

export function useCurrentUser(required = false) {
  const [loading, setLoading] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState<CurrentUser>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function getCurrentUser() {
      try {
        setLoading(true);
        const data = await Storage.getData<CurrentUser>(
          CURRENT_USER_STORAGE_KEY,
        );

        if (required && data === null) {
          // TODO: Move to constants or create an Error class
          setError('unauthorized_user');
          return;
        }

        setCurrentUser(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }

    getCurrentUser();
  }, [required]);

  return {
    loading,
    currentUser,
    error,
  };
}
