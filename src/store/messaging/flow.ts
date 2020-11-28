import { SagaIterator } from 'redux-saga';
import { call, fork, put } from 'redux-saga/effects';
import {
  messagingSubscribeToTopicService,
  registerDeviceForRemoteMessagesService,
  requestMessagingPermissionService,
} from '../../services/messaging';
import { showSnackbar } from '../snackbar/actions';
import { MessagingTopics } from './models';

function* handleMessagingFlow(): SagaIterator {
  yield call(registerDeviceForRemoteMessagesService);

  const hasMessagingPermission = yield call(requestMessagingPermissionService);

  if (hasMessagingPermission) {
    // TODO: if settings enabled, do this, else unsubscribe
    yield call(messagingSubscribeToTopicService, MessagingTopics.openedTrades);
    yield call(messagingSubscribeToTopicService, MessagingTopics.closedTrades);
  } else {
    yield put(
      showSnackbar(
        'We need your permission to send you notifications about trades and profits.',
      ),
    );
  }
}

export function* messagingFlow(): SagaIterator {
  yield fork(handleMessagingFlow);
}
