import { SagaIterator } from 'redux-saga';
import { call, fork, takeLatest, put } from 'redux-saga/effects';
import { ServicesActionsTypes } from './models';
import { restartAppService } from '../../services/rnRestart';
import { purgeStoreService } from '../../services/persistor';
import { openLinkService } from '../../services/linking';
import { ActionType } from 'typesafe-actions';
import { openLink } from './actions';
import { showSnackbar } from '../snackbar/actions';

function* restartAppFlow(): SagaIterator {
  yield call(restartAppService);
}

function* watchRestartAppFlow(): SagaIterator {
  yield takeLatest(ServicesActionsTypes.RESTART_APP, restartAppFlow);
}

function* clearCacheFlow(): SagaIterator {
  yield call(purgeStoreService);
  yield call(restartAppService);
}

function* watchClearCacheFlow(): SagaIterator {
  yield takeLatest(ServicesActionsTypes.CLEAR_CACHE, clearCacheFlow);
}

function* openLinkFlow(action: ActionType<typeof openLink>): SagaIterator {
  try {
    yield call(openLinkService, action.payload.link);
  } catch (error) {
    yield put(
      showSnackbar(`Don't know how to open this URL: ${action.payload.link}`),
    );
  }
}

function* watchOpenLinkFlow(): SagaIterator {
  yield takeLatest(ServicesActionsTypes.OPEN_LINK, openLinkFlow);
}

export function* servicesFlow(): SagaIterator {
  yield fork(watchRestartAppFlow);
  yield fork(watchClearCacheFlow);
  yield fork(watchOpenLinkFlow);
}
