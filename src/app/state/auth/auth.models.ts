export interface AuthState {
  access: string | null;
  refresh: string | null;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  access: null,
  refresh: null,
  loading: false,
  error: null,
};
