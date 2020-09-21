import { Saga, SagaIterator } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { onlyFlow } from './onlyFlow';
import { select } from './typedSelect';

export function* onlySelectorTruthyOrChanged<S extends Saga>(
  selector: any,
  saga: S,
  ...args: Parameters<S>
): SagaIterator {
  const previousValue = yield* select(selector);

  yield fork(onlyFlow, selector, previousValue, saga, ...args);
}
