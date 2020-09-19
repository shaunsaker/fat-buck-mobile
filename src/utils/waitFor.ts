import { select } from './typedSelect';
import { take } from 'redux-saga/effects';

// https://stackoverflow.com/a/58255144/7956924
export function* waitFor(selector: any, previousValue: any, takePattern = '*') {
  while (true) {
    const nextValue = yield* select(selector);
    if (nextValue !== previousValue) {
      return nextValue;
    }
    yield take(takePattern);
  }
}
