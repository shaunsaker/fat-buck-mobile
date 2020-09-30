import { expectSaga } from 'redux-saga-test-plan';
import { syncBalance } from '../balance/actions';
import rootReducer from '../reducers';
import { syncActiveBotsSuccess } from './actions';
import {
  onSyncActiveBotsChannelFlow,
  onSyncActiveBotsSuccessFlow,
} from './flow';
import { ActiveBotData } from './models';

describe('activeBots flow', () => {
  describe('onSyncActiveBotsChannelFlow', () => {
    it('puts syncActiveBotsSuccess with the returned bot ids', () => {
      const activeBotsData: ActiveBotData[] = [
        {
          id: '1',
        },
        {
          id: '2',
        },
      ];
      const actionData = activeBotsData.map(
        (activeBotData) => activeBotData.id,
      );
      return expectSaga(onSyncActiveBotsChannelFlow, activeBotsData)
        .put(syncActiveBotsSuccess(actionData))
        .run();
    });
  });

  describe('onSyncActiveBotsSuccessFlow', () => {
    it('calls the provided action for each botId in the store', () => {
      const botIds = ['1', '2', '3'];
      const state = rootReducer(undefined, syncActiveBotsSuccess(botIds));

      return expectSaga(onSyncActiveBotsSuccessFlow, syncBalance)
        .withState(state)
        .put(syncBalance(botIds[0]))
        .put(syncBalance(botIds[1]))
        .put(syncBalance(botIds[2]))
        .run();
    });
  });
});
