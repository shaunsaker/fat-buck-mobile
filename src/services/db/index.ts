import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { eventChannel } from 'redux-saga';

const firestoreSync = <T>(
  ref: FirebaseFirestoreTypes.CollectionReference,
  cb: (data: T | { [key: string]: any }) => void,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const unsubscribe = ref.onSnapshot(
        (snapshot) => {
          const data = snapshot.docs.map((document) => {
            return {
              ...document.data(),
              id: document.id,
            };
          });

          cb(data);
        },
        (error) => {
          // TODO: can't catch these errors
          console.log({ error });
          cb(error);
        },
      );

      resolve(unsubscribe);
    } catch (error) {
      reject(error);
    }
  });
};

export const createFirestoreSyncChannel = <T>(
  ref: FirebaseFirestoreTypes.CollectionReference,
) => {
  return eventChannel((emit) => {
    firestoreSync<T>(ref, emit);
    // The subscriber must return an unsubscribe function
    return () => {};
  });
};
