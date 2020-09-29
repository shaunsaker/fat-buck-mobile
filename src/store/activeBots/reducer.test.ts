import {
  syncActiveBots,
  syncActiveBotsError,
  syncActiveBotsSuccess,
} from './actions';
import { ActiveBotsState } from './models';
import { activeBotsReducer, initialState } from './reducer';

describe('activeBots reducer', () => {
  it('sets loading to true on SYNC_ACTIVE_BOTS', () => {
    const nextState = activeBotsReducer(initialState, syncActiveBots());

    expect(nextState.loading).toEqual(true);
  });

  it('sets state correctly on SYNC_ACTIVE_BOTS_SUCCESS', () => {
    let nextState = activeBotsReducer(initialState, syncActiveBots());
    const activeBotIds = ['1', '2', '3'];
    const expected: ActiveBotsState = {
      loading: false,
      botIds: activeBotIds,
    };
    nextState = activeBotsReducer(
      nextState,
      syncActiveBotsSuccess(activeBotIds),
    );

    expect(nextState).toEqual(expected);
  });

  it('sets loading to false on SYNC_ACTIVE_BOTS_ERROR', () => {
    let nextState = activeBotsReducer(initialState, syncActiveBots());
    nextState = activeBotsReducer(nextState, syncActiveBotsError());

    expect(nextState.loading).toEqual(false);
  });
});
