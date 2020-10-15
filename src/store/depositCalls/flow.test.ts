import { expectSaga } from 'redux-saga-test-plan';
import { firebaseCreateDepositCall } from '../../services/callable';
import { createDepositCall, syncDepositCallsSuccess } from './actions';
import { onCreateDepositCallFlow, onSyncDepositCallsChannelFlow } from './flow';
import { DepositCallData, DepositCalls, DepositCallStatus } from './models';
import * as matchers from 'redux-saga-test-plan/matchers';
import { setSliderIndex } from '../sliders/actions';
import { Sliders } from '../sliders/models';
import {
  createDepositCallSuccess,
  createDepositCallError,
} from '../depositCalls/actions';
import { initialState } from '../reducers';
import { showSnackbar } from '../snackbar/actions';
import { throwError } from 'redux-saga-test-plan/providers';

describe('depositCalls flow', () => {
  describe('onSyncDepositCallsChannelFlow', () => {
    it('puts syncDepositCallsSuccess with the returned data', () => {
      const id = '1';
      const depositCall: DepositCallData = {
        id,
        uid: '',
        date: '',
        walletAddress: '',
        status: DepositCallStatus.PENDING,
      };
      const data: DepositCallData[] = [depositCall];
      const expected: DepositCalls = {
        [id]: depositCall,
      };

      return expectSaga(onSyncDepositCallsChannelFlow, data)
        .put(syncDepositCallsSuccess(expected))
        .run();
    });
  });

  describe('onCreateDepositCallFlow', () => {
    const walletAddress = '12345678';

    it('handles success correctly', () => {
      return expectSaga(
        onCreateDepositCallFlow,
        createDepositCall(walletAddress),
      )
        .provide([[matchers.call.fn(firebaseCreateDepositCall), undefined]])
        .withState(initialState)
        .put(setSliderIndex(Sliders.deposit, 1))
        .put(createDepositCallSuccess())
        .run();
    });

    it('handles returned errors correctly', () => {
      const errorMessage = 'Hello';
      return expectSaga(
        onCreateDepositCallFlow,
        createDepositCall(walletAddress),
      )
        .provide([
          [
            matchers.call.fn(firebaseCreateDepositCall),
            new Error(errorMessage),
          ],
        ])
        .withState(initialState)
        .put(showSnackbar(errorMessage))
        .put(createDepositCallError())
        .run();
    });

    it('handles thrown errors correctly', () => {
      const errorMessage = 'Hello';
      return expectSaga(
        onCreateDepositCallFlow,
        createDepositCall(walletAddress),
      )
        .provide([
          [
            matchers.call.fn(firebaseCreateDepositCall),
            throwError(new Error(errorMessage)),
          ],
        ])
        .withState(initialState)
        .put(showSnackbar(errorMessage))
        .put(createDepositCallError())
        .run();
    });
  });
});
