import { SagaIterator, Saga } from 'redux-saga';
import { select } from './typedSelect';
import { waitFor } from './waitFor';
import { call } from 'redux-saga/effects';

export function* onlyFlow<S extends Saga>(
  selector: any,
  previousValue: any,
  saga: S,
  ...args: Parameters<S>
): SagaIterator {
  // if the condition evaluates to truthy, call the saga
  // else wait for it to evaluate to truthy and then call the saga
  const condition = yield* select(selector);

  if (condition) {
    yield call(saga, ...args);
  } else {
    yield call(waitFor, selector, previousValue); // wait for selector to be different to previousValue
    yield call(saga, ...args);
  }
}
