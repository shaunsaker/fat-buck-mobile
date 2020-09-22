import { useEffect, useCallback } from 'react';
import CodePush from 'react-native-code-push';
import Snackbar from 'react-native-snackbar';
import { AppState, AppStateStatus } from 'react-native';
import { useDispatch } from 'react-redux';

export const CodePushHandler = () => {
  const dispatch = useDispatch();

  const showSnackbar = useCallback(
    (text: string) => {
      dispatch(showSnackbar(text));
    },
    [dispatch],
  );

  const syncCodePush = useCallback(() => {
    const codePushStatusDidChange = (status: CodePush.SyncStatus) => {
      switch (status) {
        case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
          showSnackbar('Downloading update...');
          break;

        case CodePush.SyncStatus.UPDATE_INSTALLED:
          Snackbar.dismiss();
          break;

        default:
          break;
      }
    };

    CodePush.sync(
      { installMode: CodePush.InstallMode.IMMEDIATE, updateDialog: {} },
      codePushStatusDidChange,
    );
  }, [showSnackbar]);

  const onAppStateChange = useCallback(
    (appState: AppStateStatus) => {
      if (appState === 'active') {
        syncCodePush();
      }
    },
    [syncCodePush],
  );

  useEffect(() => {
    if (!__DEV__) {
      syncCodePush();

      AppState.addEventListener('change', onAppStateChange);

      return () => {
        AppState.removeEventListener('change', onAppStateChange);
      };
    }
  });

  return null;
};
