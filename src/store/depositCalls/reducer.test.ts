import {
  createDepositCall,
  createDepositCallError,
  createDepositCallSuccess,
  syncDepositCalls,
  syncDepositCallsError,
  syncDepositCallsSuccess,
} from './actions';
import { DepositCallData, DepositCalls, DepositCallStatus } from './models';
import { depositCallsReducer, initialState } from './reducer';

describe('depositCalls reducer', () => {
  it('sets loading to true on syncDepositCalls', () => {
    const nextState = depositCallsReducer(initialState, syncDepositCalls());

    expect(nextState.loading).toEqual(true);
  });

  it('sets state correctly on syncDepositCallsSuccess', () => {
    let nextState = depositCallsReducer(initialState, syncDepositCalls());

    const id = '1';
    const depositCall: DepositCallData = {
      id,
      uid: '',
      date: '',
      walletAddress: '',
      status: DepositCallStatus.PENDING,
    };
    const data: DepositCalls = {
      [id]: depositCall,
    };
    nextState = depositCallsReducer(nextState, syncDepositCallsSuccess(data));

    expect(nextState.data).toEqual(data);
    expect(nextState.loading).toEqual(false);
  });

  it('sets loading to false on syncDepositCallsError', () => {
    const nextState = depositCallsReducer(
      initialState,
      syncDepositCallsError(),
    );

    expect(nextState.loading).toEqual(false);
  });

  it('sets loading to true on createDepositCall', () => {
    const walletAddress = '123345678';
    const nextState = depositCallsReducer(
      initialState,
      createDepositCall(walletAddress),
    );

    expect(nextState.loading).toEqual(true);
  });

  it('sets loading to false on createDepositCallSuccess', () => {
    const nextState = depositCallsReducer(
      initialState,
      createDepositCallSuccess(),
    );

    expect(nextState.loading).toEqual(false);
  });

  it('sets loading to false on createDepositCallError', () => {
    const nextState = depositCallsReducer(
      initialState,
      createDepositCallError(),
    );

    expect(nextState.loading).toEqual(false);
  });
});
