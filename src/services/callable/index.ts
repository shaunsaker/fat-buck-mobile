import { firebase } from '@react-native-firebase/functions';
import { Callable } from './models';

const defaultApp = firebase.app();
defaultApp.functions('europe-west1');
const instance = firebase.functions().httpsCallable(Callable.createDepositCall);

export const firebaseCreateDepositCall = async (walletAddress: string) => {
  try {
    await instance({
      walletAddress,
    });
  } catch (error) {
    return error;
  }
};
