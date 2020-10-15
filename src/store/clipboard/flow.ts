import Clipboard from '@react-native-community/clipboard';
import { SagaIterator } from 'redux-saga';
import { fork, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { copyTextToClipboard } from './actions';
import { ClipboardActionTypes } from './models';

export function* onCopyTextToClipboardFlow(
  action: ActionType<typeof copyTextToClipboard>,
): SagaIterator {
  Clipboard.setString(action.payload.text);
}

export function* watchCopyTextToClipboardFlow(): SagaIterator {
  yield takeLatest(
    ClipboardActionTypes.COPY_TEXT_TO_CLIPBOARD,
    onCopyTextToClipboardFlow,
  );
}

export function* clipboardFlow(): SagaIterator {
  yield fork(watchCopyTextToClipboardFlow);
}
