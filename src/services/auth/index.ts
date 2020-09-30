import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const firebaseSignInWithPhoneNumber = async (cellphone: string) => {
  return await auth().signInWithPhoneNumber(cellphone);
};

export const firebaseVerifyPinCode = async (
  pinCode: string,
  confirmationResult: FirebaseAuthTypes.ConfirmationResult | undefined,
) => {
  return await confirmationResult?.confirm(pinCode);
};

export const firebaseGetEmailCredential = async (
  email: string,
  password: string,
) => {
  return await auth.EmailAuthProvider.credential(email, password);
};

export const firebaseSignInWithCredential = async (
  credential: FirebaseAuthTypes.AuthCredential,
) => {
  return await auth().signInWithCredential(credential);
};

export const firebaseLinkWithCredential = async (
  credential: FirebaseAuthTypes.AuthCredential,
) => {
  return await auth().currentUser?.linkWithCredential(credential);
};

export const firebaseSignOut = async () => {
  return await auth().signOut();
};

export const firebaseSendPasswordResetEmail = async (email: string) => {
  return await auth().sendPasswordResetEmail(email);
};
