import auth, { firebase } from '@react-native-firebase/auth';

export const firebaseCreateUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  return await auth().createUserWithEmailAndPassword(email, password);
};

export const firebaseSignInWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  return await auth().signInWithEmailAndPassword(email, password);
};

export const firebaseSignOut = async () => {
  return await auth().signOut();
};
