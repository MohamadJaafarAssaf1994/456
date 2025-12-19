import { authReducer, initialAuthState } from './auth.reducer';
import * as AuthActions from './auth.actions';

describe('Auth Reducer', () => {
  it('should store tokens and username on loginSuccess', () => {
    const action = AuthActions.loginSuccess({
      username: 'john_doe',
      access: 'fake-access-token',
      refresh: 'fake-refresh-token',
    });

    const state = authReducer(initialAuthState, action);

    expect(state.username).toBe('john_doe');
    expect(state.isLoggedIn).toBeTrue();
    expect(state.error).toBeNull();
  });

  it('should store error on loginFailure', () => {
    const action = AuthActions.loginFailure({
      error: 'Invalid credentials',
    });

    const state = authReducer(initialAuthState, action);

    expect(state.isLoggedIn).toBeFalse();
    expect(state.error).toBe('Invalid credentials');
  });

  it('should reset state on logout', () => {
    const loggedState = {
      username: 'john_doe',
      isLoggedIn: true,
      error: null,
    };

    const action = AuthActions.logout();
    const state = authReducer(loggedState, action);

    expect(state).toEqual(initialAuthState);
  });
});
