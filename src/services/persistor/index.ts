import { persistor } from '../../store';

export const purgeStoreService = () => {
  return new Promise(async (resolve) => {
    await persistor.purge();

    resolve();
  });
};
