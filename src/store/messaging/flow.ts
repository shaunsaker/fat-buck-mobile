import { SagaIterator } from 'redux-saga';
import { call, fork, put } from 'redux-saga/effects';
import {
  messagingSubscribeToTopicService,
  messagingUnsubscribeFromTopicService,
  requestMessagingPermissionService,
} from '../../services/messaging';
import { connectSaga } from '../../utils/connectSaga';
import { select } from '../../utils/typedSelect';
import { ApplicationState } from '../reducers';
import { selectMessageTopicEnabled } from '../settings/selectors';
import { showSnackbar } from '../snackbar/actions';
import { MessagingTopics } from './models';

function* messagingTopicFlow(topic: MessagingTopics): SagaIterator {
  const hasMessagingPermission = yield call(requestMessagingPermissionService);

  if (hasMessagingPermission) {
    const messagingTopicEnabled = yield* select((state: ApplicationState) =>
      selectMessageTopicEnabled(state, topic),
    );

    if (messagingTopicEnabled) {
      yield call(messagingSubscribeToTopicService, topic);
    } else {
      yield call(messagingUnsubscribeFromTopicService, topic);
    }
  } else {
    yield put(
      showSnackbar('We need your permission to send you notifications.'),
    );
  }
}

export function* messagingFlow(): SagaIterator {
  yield fork(() =>
    connectSaga(
      (state: ApplicationState) =>
        selectMessageTopicEnabled(state, MessagingTopics.openedTrades),
      () => messagingTopicFlow(MessagingTopics.openedTrades),
    ),
  );
  yield fork(() =>
    connectSaga(
      (state: ApplicationState) =>
        selectMessageTopicEnabled(state, MessagingTopics.closedTrades),
      () => messagingTopicFlow(MessagingTopics.closedTrades),
    ),
  );
  yield fork(() =>
    connectSaga(
      (state: ApplicationState) =>
        selectMessageTopicEnabled(state, MessagingTopics.depositSuccess),
      () => messagingTopicFlow(MessagingTopics.depositSuccess),
    ),
  );
}
