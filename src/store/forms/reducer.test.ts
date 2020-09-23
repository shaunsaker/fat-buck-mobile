import { formsReducer, initialState } from './reducer';
import { setFormField } from './actions';
import { Forms, SignInFields } from './models';

describe('forms reducer', () => {
  it('sets form fields correctly', () => {
    const email = 'sakershaun@gmail.com';
    const nextState = formsReducer(
      initialState,
      setFormField(Forms.signIn, SignInFields.email, email),
    );

    expect(nextState.signIn.email).toEqual(email);
  });
});
