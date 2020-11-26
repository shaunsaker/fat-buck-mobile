import { FirebaseAuthTypes } from '@react-native-firebase/auth';

const uid = '123123';
const email = 'sakershaun@gmail.com';
const password = '123123';
const cellphone = '+27833771130';
const pinCode = '123123';

const userCredential: FirebaseAuthTypes.UserCredential = {
  user: {
    displayName: '',
    email,
    emailVerified: false,
    isAnonymous: false,
    metadata: {},
    phoneNumber: cellphone,
    photoURL: '',
    providerData: [],
    providerId: '',
    uid,
    delete: () => {
      return new Promise(() => {});
    },
    getIdToken: () => {
      return new Promise(() => {});
    },
    getIdTokenResult: () => {
      return new Promise(() => {});
    },
    linkWithCredential: () => {
      return new Promise(() => {});
    },
    reauthenticateWithCredential: () => {
      return new Promise(() => {});
    },
    reload: () => {
      return new Promise(() => {});
    },
    sendEmailVerification: () => {
      return new Promise(() => {});
    },
    verifyBeforeUpdateEmail: () => {
      return new Promise(() => {});
    },
    toJSON: () => {
      return new Promise(() => {});
    },
    unlink: () => {
      return new Promise(() => {});
    },
    updateEmail: () => {
      return new Promise(() => {});
    },
    updatePassword: () => {
      return new Promise(() => {});
    },
    updatePhoneNumber: () => {
      return new Promise(() => {});
    },
    updateProfile: () => {
      return new Promise(() => {});
    },
  },
};

const confirmationResult = {
  verificationId: '1',
  confirm: (): Promise<FirebaseAuthTypes.UserCredential> => {
    return new Promise((resolve) => resolve(userCredential));
  },
};

const emailCredential = {
  providerId: 'email',
  token: '1',
  secret: '1',
};

export const testUser = {
  uid,
  email,
  password,
  cellphone,
  pinCode,
  userCredential,
  confirmationResult,
  emailCredential,
};
