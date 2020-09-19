import { USER_NOT_FOUND_ERROR_MESSAGE } from '../../src/auth/flow';

export const EXISTING_USER_EMAIL = 'existing@gmail.com';
export const NEW_USER_EMAIL = 'new@gmail.com';
export const TEST_PASSWORD = '123123';
export const TEST_UID = '111111';

export default () => ({
  signInWithEmailAndPassword: jest.fn((email, password) => {
    if (email === EXISTING_USER_EMAIL) {
      return {
        user: {
          email: EXISTING_USER_EMAIL,
          uid: TEST_UID,
        },
      };
    }

    throw new Error(USER_NOT_FOUND_ERROR_MESSAGE);
  }),
  createUserWithEmailAndPassword: jest.fn((email, password) => {
    return { user: { email: NEW_USER_EMAIL, uid: TEST_UID } };
  }),
  signOut: jest.fn(),
});
