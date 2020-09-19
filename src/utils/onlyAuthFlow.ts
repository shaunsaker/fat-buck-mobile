import { SagaIterator, Saga } from 'redux-saga';
import { select } from './typedSelect';
import { selectIsAuthenticated } from '../auth/selectors';
import { waitFor } from './waitFor';
import { call } from 'redux-saga/effects';

export function* onlyAuthFlow<S extends Saga>(
  saga: S,
  ...args: Parameters<S>
): SagaIterator {
  const authenticated = yield* select(selectIsAuthenticated);

  if (authenticated) {
    yield call(saga, ...args);
  } else {
    yield call(waitFor, selectIsAuthenticated, false); // wait for authentication
    yield call(saga, ...args);
  }
}
