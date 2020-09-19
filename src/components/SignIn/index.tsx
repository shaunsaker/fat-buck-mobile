import React, { useCallback, useState } from 'react';
import styled from 'styled-components/native';
import { HeaderBar } from '../HeaderBar';
import { Input } from '../Input';
import Button, { ButtonKinds } from '../Button';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { initiateCreateUser, verifyPinCode } from '../../auth/actions';
import {
  selectAuthConfirmationResult,
  selectIsAuthLoading,
  selectIsNewUser,
} from '../../auth/selectors';
import { Background } from '../Background';
import { PageHeader } from '../PageHeader';
import { dimensions } from '../../dimensions';
import { Link } from '../Link';
import { ParagraphText } from '../ParagraphText';
import { ScreenNavigationProps, Screens } from '../../Router';
import { validateEmail } from '../../utils/validateEmail';
import { validatePhoneNumber } from '../../utils/validatePhoneNumber';

const SignInContainer = styled.View`
  flex: 1;
  align-items: center;
  padding: ${dimensions.rhythm}px;
`;

const SignInInputsContainer = styled.View`
  flex: 1;
  align-self: stretch;
`;

const SignInInputContainer = styled.View`
  margin-bottom: ${dimensions.rhythm}px;
  align-self: stretch;
`;

const SignInButtonContainer = styled.View`
  margin: ${dimensions.rhythm}px 0;
  align-self: center;
`;

const ForgotPasswordContainer = styled.View`
  align-items: flex-end;
  margin-bottom: ${dimensions.rhythm}px;
`;

const StyledLink = styled(Link)``;

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
      <HeaderBar />

      <PageHeader>Sign {isNewUser ? 'Up' : 'In'}</PageHeader>

      <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
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

          <ParagraphText>
            By signing in, you agree to our{' '}
            <StyledLink onPress={() => {}}>terms</StyledLink>.
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
        </SignInContainer>
      </TouchableWithoutFeedback>
    </Background>
  );
};

interface SignInProps {
  navigation: ScreenNavigationProps<Screens.signIn>;
}

export const SignIn = ({}: SignInProps) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [pinCode, setPinCode] = useState('');

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

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const onChangePassword = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const onChangeCellphone = useCallback((text: string) => {
    setCellphone(text);
  }, []);

  const onChangePinCode = useCallback((text: string) => {
    setPinCode(text);
  }, []);

  const onDismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const onSubmit = useCallback(() => {
    Keyboard.dismiss();

    if (hasSubmitted) {
      dispatch(verifyPinCode(pinCode, email, password));
    } else {
      dispatch(initiateCreateUser(cellphone));
    }
  }, [dispatch, hasSubmitted, email, password, cellphone, pinCode]);

  const onForgotPassword = useCallback(() => {
    // TODO
  }, []);

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
