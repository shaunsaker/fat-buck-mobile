import { saveUser, saveUserError, saveUserSuccess } from './actions';
import { UserData, UserState } from './models';
import { userReducer, initialState } from './reducer';

describe('user reducer', () => {
  const userData: UserData = {
    uid: '1',
    email: '1',
    cellphone: '1',
    country: '1',
    dateLastSignedIn: '1',
  };

  it('sets state correctly on SAVE_USER', () => {
    let expected: UserState = {
      loading: true,
      ...userData,
    };
    let nextState = userReducer(initialState, saveUser(userData));

    expect(nextState).toEqual(expected);

    // updated userData
    const updatedUserData: UserData = {
      ...userData,
      dateLastSignedIn: '2',
    };
    expected = {
      loading: true,
      ...updatedUserData,
    };

    nextState = userReducer(initialState, saveUser(updatedUserData));

    expect(nextState).toEqual(expected);
  });

  it('sets loading to false on SAVE_USER_SUCCESS', () => {
    let nextState = userReducer(initialState, saveUser(userData));
    nextState = userReducer(nextState, saveUserSuccess());

    expect(nextState.loading).toEqual(false);
  });

  it('sets loading to false on SAVE_USER_ERROR', () => {
    let nextState = userReducer(initialState, saveUser(userData));
    nextState = userReducer(nextState, saveUserError());

    expect(nextState.loading).toEqual(false);
  });
});
