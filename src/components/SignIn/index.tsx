import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import { HeaderBar } from '../HeaderBar';
import { Input } from '../Input';
import Button, { ButtonKinds } from '../Button';
import { Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { initiateSignIn, finaliseSignIn } from '../../store/auth/actions';
import {
  selectAuthConfirmationResult,
  selectIsAuthLoading,
  selectIsNewUser,
} from '../../store/auth/selectors';
import { Background } from '../Background';
import { PageHeader } from '../PageHeader';
import { dimensions } from '../../dimensions';
import { Link } from '../Link';
import { ParagraphText } from '../ParagraphText';
import { ScreenNavigationProps, Screens } from '../../Router';
import { validateEmail } from '../../utils/validateEmail';
import { validatePhoneNumber } from '../../utils/validatePhoneNumber';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  selectSignInCellphoneFormField,
  selectSignInEmailFormField,
  selectSignInPasswordFormField,
  selectSignInPinCodeFormField,
} from '../../store/forms/selectors';
import { setFormField } from '../../store/forms/actions';
import { Forms, SignInFields } from '../../store/forms/models';

const SignInContainer = styled.View`
  flex: 1;
`;

const SignInInputsContainer = styled.View`
  max-width: 360px;
  width: 100%;
  align-self: center;
  padding: ${dimensions.rhythm}px;
`;

const SignInInputContainer = styled.View`
  margin-bottom: ${dimensions.rhythm}px;
  align-self: stretch;
`;

const SignInFooterContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const SignInButtonContainer = styled.View`
  margin: ${dimensions.rhythm}px 0;
  align-self: center;
`;

const ForgotPasswordContainer = styled.View`
  align-items: flex-end;
  margin-bottom: ${dimensions.rhythm}px;
`;

const TermsLinkContainer = styled.View``;

const PinCodeTextContainer = styled.View`
  margin-bottom: ${dimensions.rhythm}px;
`;

interface SignInBaseProps {
  isNewUser: boolean;
  isLoading: boolean;
  isDisabled: boolean;
  email: string;
  isEmailValid: boolean;
  handleChangeEmail: (email: string) => void;
  password: string;
  isPasswordValid: boolean;
  handleChangePassword: (password: string) => void;
  cellphone: string;
  isCellphoneValid: boolean;
  handleChangeCellphone: (cellphone: string) => void;
  pinCode: string;
  isPinCodeValid: boolean;
  handleChangePinCode: (pinCode: string) => void;
  handleSubmit: () => void;
  hasSubmitted: boolean;
  handleDismissKeyboard: () => void;
  handleForgotPassword: () => void;
}

const SignInBase = ({
  isNewUser,
  isLoading,
  isDisabled,
  email,
  isEmailValid,
  handleChangeEmail,
  password,
  isPasswordValid,
  handleChangePassword,
  cellphone,
  isCellphoneValid,
  handleChangeCellphone,
  pinCode,
  isPinCodeValid,
  handleChangePinCode,
  handleSubmit,
  hasSubmitted,
  handleDismissKeyboard,
  handleForgotPassword,
}: SignInBaseProps) => {
  return (
    <Background>
      <HeaderBar showClose={isNewUser} />

      <PageHeader>Sign {isNewUser ? 'Up' : 'In'}</PageHeader>

      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled">
        <SignInContainer>
          <SignInInputsContainer>
            <SignInInputContainer>
              <Input
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                autoFocus
                isValid={isEmailValid}
                onChangeText={handleChangeEmail}
                onSubmitEditing={handleDismissKeyboard}
              />
            </SignInInputContainer>

            <SignInInputContainer>
              <Input
                placeholder="Password"
                secureTextEntry
                value={password}
                isValid={isPasswordValid}
                onChangeText={handleChangePassword}
                onSubmitEditing={handleDismissKeyboard}
              />
            </SignInInputContainer>

            <ForgotPasswordContainer>
              <Link onPress={handleForgotPassword}>Forgot password?</Link>
            </ForgotPasswordContainer>

            <SignInInputContainer>
              <Input
                placeholder="Cellphone (E.g. +27833771131)"
                keyboardType="number-pad"
                value={cellphone}
                isValid={isCellphoneValid}
                onChangeText={handleChangeCellphone}
                onSubmitEditing={handleSubmit}
              />
            </SignInInputContainer>

            {hasSubmitted ? (
              <>
                <PinCodeTextContainer>
                  <ParagraphText center>
                    Please enter the PIN code that we SMS'd to your number:{' '}
                    {cellphone}.
                  </ParagraphText>
                </PinCodeTextContainer>

                <SignInInputContainer>
                  <Input
                    placeholder="PIN Code"
                    keyboardType="number-pad"
                    value={pinCode}
                    isValid={isPinCodeValid}
                    autoFocus
                    onChangeText={handleChangePinCode}
                    onSubmitEditing={handleSubmit}
                  />
                </SignInInputContainer>
              </>
            ) : null}
          </SignInInputsContainer>

          <SignInFooterContainer>
            <ParagraphText>
              By signing in, you agree to our{' '}
              <TermsLinkContainer>
                <Link onPress={() => {}}>terms</Link>
              </TermsLinkContainer>
              .
            </ParagraphText>

            <SignInButtonContainer>
              <Button
                kind={isDisabled ? ButtonKinds.secondary : ButtonKinds.primary}
                loading={isLoading}
                disabled={isDisabled}
                onPress={handleSubmit}>
                SUBMIT
              </Button>
            </SignInButtonContainer>
          </SignInFooterContainer>
        </SignInContainer>
      </KeyboardAwareScrollView>
    </Background>
  );
};

interface SignInProps {
  navigation: ScreenNavigationProps<Screens.signIn>;
}

export const SignIn = ({ navigation }: SignInProps) => {
  const dispatch = useDispatch();
  const email = useSelector(selectSignInEmailFormField);
  const password = useSelector(selectSignInPasswordFormField);
  const cellphone = useSelector(selectSignInCellphoneFormField);
  const pinCode = useSelector(selectSignInPinCodeFormField);
  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 6;
  const isCellphoneValid = validatePhoneNumber(cellphone);
  const isPinCodeValid = pinCode.length >= 6;
  const isLoading = useSelector(selectIsAuthLoading);
  const isNewUser = useSelector(selectIsNewUser);
  const hasSubmitted = Boolean(useSelector(selectAuthConfirmationResult));
  const isDisabled =
    isLoading ||
    (hasSubmitted
      ? !isPinCodeValid
      : !isEmailValid || !isPasswordValid || !isCellphoneValid);

  const onChangeEmail = useCallback(
    (text: string) => {
      dispatch(setFormField(Forms.signIn, SignInFields.email, text));
    },
    [dispatch],
  );

  const onChangePassword = useCallback(
    (text: string) => {
      dispatch(setFormField(Forms.signIn, SignInFields.password, text));
    },
    [dispatch],
  );

  const onChangeCellphone = useCallback(
    (text: string) => {
      dispatch(setFormField(Forms.signIn, SignInFields.cellphone, text));
    },
    [dispatch],
  );

  const onChangePinCode = useCallback(
    (text: string) => {
      dispatch(setFormField(Forms.signIn, SignInFields.pinCode, text));
    },
    [dispatch],
  );

  const onDismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const onSubmit = useCallback(() => {
    Keyboard.dismiss();

    if (hasSubmitted) {
      dispatch(finaliseSignIn(pinCode, email, password));
    } else {
      dispatch(initiateSignIn(cellphone));
    }
  }, [dispatch, hasSubmitted, email, password, cellphone, pinCode]);

  const onForgotPassword = useCallback(() => {
    navigation.navigate(Screens.forgotPassword);
  }, [navigation]);

  return (
    <SignInBase
      isNewUser={isNewUser}
      isLoading={isLoading}
      isDisabled={isDisabled}
      email={email}
      isEmailValid={isEmailValid}
      handleChangeEmail={onChangeEmail}
      password={password}
      isPasswordValid={isPasswordValid}
      handleChangePassword={onChangePassword}
      cellphone={cellphone}
      isCellphoneValid={isCellphoneValid}
      handleChangeCellphone={onChangeCellphone}
      pinCode={pinCode}
      isPinCodeValid={isPinCodeValid}
      handleChangePinCode={onChangePinCode}
      handleSubmit={onSubmit}
      hasSubmitted={hasSubmitted}
      handleDismissKeyboard={onDismissKeyboard}
      handleForgotPassword={onForgotPassword}
    />
  );
};
