import { LOGIN_API_ROUTE } from '../Routes/api';

type LoginArgs = {
  email: string;
  password: string;
};

export type LoginError = {
  message: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
};

export type LoginReturn = LoginError & {
  user: {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string | null;
    two_factor_confirmed_at?: string | null;
    current_team_id?: number | null;
    profile_photo_path?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    profile_photo_url: string | null;
  };
  token: string;
};

// TODO: Move to Sessions domain maybe?
export async function login({
  email,
  password,
}: LoginArgs): Promise<LoginReturn> {
  const response = await fetch(LOGIN_API_ROUTE, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const body = await response.json();

  if (response.ok) {
    return body;
  }

  throw new Error(body.message);
}
