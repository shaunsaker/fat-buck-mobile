import { testUser } from '../../src/auth/mocks';

export default () => ({
  signInWithPhoneNumber: jest.fn(() => {
    return new Promise((resolve) => {
      resolve(testUser.confirmationResult);
    });
  }),
  verifyPinCode: jest.fn(() => {
    return new Promise((resolve) => {
      resolve(testUser.userCredential);
    });
  }),
  signOut: jest.fn(),
});
