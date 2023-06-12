import React from 'react';
import Storage from '../../utils/storage';
import { CurrentUser } from '../Session/types';
import { CURRENT_USER_STORAGE_KEY } from '../Session/contants';

type State = {
  userToken: string | null;
  isLoading: boolean;
  isSignout: boolean;
};

enum ActionKind {
  Restore = 'RESTORE_TOKEN',
  SignIn = 'SIGN_IN',
  SignOut = 'SIGN_OUT',
}

type UserToken = string | null;

type Action = {
  type: ActionKind;
  payload: UserToken;
};

type ContextType = {
  userToken: UserToken;
  signIn: ({ userToken }: SignInArgs) => Promise<void>;
};

type SignInArgs = {
  userToken: UserToken;
};

type Props = {
  children: React.ReactNode;
};

const DEFAULT_CONTEXT_VALUE: ContextType = {
  userToken: null,
  signIn: async () => {},
};

export const AuthContext = React.createContext<ContextType>(
  DEFAULT_CONTEXT_VALUE,
);

export default function AuthProvider({ children }: Props) {
  const [state, dispatch] = React.useReducer(
    (prevState: State, action: Action): State => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.payload,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.payload,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        default:
          return {
            ...prevState,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
    () => ({
      isLoading: true,
      isSignout: false,
      userToken: null,
    }),
  );

  React.useEffect(() => {
    async function getCurrentUserToken() {
      let userToken = null;
      try {
        const currentUser = await Storage.getData<CurrentUser>(
          CURRENT_USER_STORAGE_KEY,
        );
        userToken = currentUser?.token ?? null;
      } catch (e) {
        throw e;
      }
      dispatch({
        type: ActionKind.Restore,
        payload: userToken,
      });
    }

    getCurrentUserToken();
  }, []);

  const contextValue: ContextType = React.useMemo(() => {
    return {
      signIn: async ({ userToken }: { userToken: UserToken }) => {
        dispatch({
          type: ActionKind.SignIn,
          payload: userToken,
        });
      },
      userToken: state.userToken,
    };
  }, [state]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
