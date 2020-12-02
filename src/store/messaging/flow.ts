import { SagaIterator } from 'redux-saga';
import { call, fork, put } from 'redux-saga/effects';
import {
  messagingSubscribeToTopicService,
  messagingUnsubscribeFromTopicService,
  requestMessagingPermissionService,
} from '../../services/messaging';
import { connectSaga } from '../../utils/connectSaga';
import { select } from '../../utils/typedSelect';
import {
  selectNotificationsClosedTradesEnabled,
  selectNotificationsOpenedTradesEnabled,
} from '../settings/selectors';
import { showSnackbar } from '../snackbar/actions';
import { MessagingTopics } from './models';

function* handleMessagingFlow(): SagaIterator {
  const hasMessagingPermission = yield call(requestMessagingPermissionService);

  if (hasMessagingPermission) {
    const openTradesNotificationEnabled = yield* select(
      selectNotificationsOpenedTradesEnabled,
    );

    if (openTradesNotificationEnabled) {
      yield call(
        messagingSubscribeToTopicService,
        MessagingTopics.openedTrades,
      );
    } else {
      yield call(
        messagingUnsubscribeFromTopicService,
        MessagingTopics.openedTrades,
      );
    }

    const closedTradesNotificationEnabled = yield* select(
      selectNotificationsClosedTradesEnabled,
    );

    if (closedTradesNotificationEnabled) {
      yield call(
        messagingSubscribeToTopicService,
        MessagingTopics.closedTrades,
      );
    } else {
      yield call(
        messagingUnsubscribeFromTopicService,
        MessagingTopics.closedTrades,
      );
    }
  } else {
    yield put(
      showSnackbar(
        'We need your permission to send you notifications about trades and profits.',
      ),
    );
  }
}

// FIXME: we should use separate flows here
export function* messagingFlow(): SagaIterator {
  yield fork(handleMessagingFlow);
  yield fork(() =>
    connectSaga(selectNotificationsOpenedTradesEnabled, handleMessagingFlow),
  );
  yield fork(() =>
    connectSaga(selectNotificationsClosedTradesEnabled, handleMessagingFlow),
  );
}
