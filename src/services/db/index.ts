import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { eventChannel } from 'redux-saga';

// FIXME: type this correctly
const firestoreSync = <T>(
  ref:
    | FirebaseFirestoreTypes.CollectionReference
    | FirebaseFirestoreTypes.DocumentReference,
  cb: (data: T | { [key: string]: any }) => void,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const unsubscribe = ref.onSnapshot(
        (
          snapshot:
            | FirebaseFirestoreTypes.QuerySnapshot
            | FirebaseFirestoreTypes.DocumentSnapshot,
        ) => {
          let data;

          if (snapshot.docs) {
            // it's a collection ref
            data = snapshot.docs.map(
              (document: FirebaseFirestoreTypes.DocumentData) => {
                return {
                  ...document.data(),
                  id: document.id,
                };
              },
            );
          } else {
            // it's a doc ref
            data = {
              ...snapshot.data(),
              id: snapshot.id,
            };
          }

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
  ref:
    | FirebaseFirestoreTypes.CollectionReference
    | FirebaseFirestoreTypes.DocumentReference,
) => {
  return eventChannel((emit) => {
    firestoreSync<T>(ref, emit);
    // The subscriber must return an unsubscribe function
    return () => {};
  });
};

export const firestoreSaveDocument = async <T>(
  ref: FirebaseFirestoreTypes.DocumentReference,
  data: T,
) => {
  await ref.set(data, { merge: true });
};

export const firestoreDeleteDocument = async <T>(
  ref: FirebaseFirestoreTypes.DocumentReference,
) => {
  await ref.delete();
};
