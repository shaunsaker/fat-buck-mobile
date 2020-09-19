import React, { useCallback, useState } from 'react';
import styled from 'styled-components/native';
import { HeaderBar } from '../HeaderBar';
import { Input } from '../Input';
import Button, { ButtonKinds } from '../Button';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createUserWithEmailAndPassword } from '../../auth/actions';
import { selectIsAuthLoading } from '../../auth/selectors';
import { Background } from '../Background';
import { PageHeader } from '../PageHeader';
import { dimensions } from '../../dimensions';
import { Link } from '../Link';
import { ParagraphText } from '../ParagraphText';
import { ScreenNavigationProps, Screens } from '../../Router';

const SignInContainer = styled.View`
  flex: 1;
  align-items: center;
  padding: 0 ${dimensions.rhythm}px;
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
  handleChangeEmail: (email: string) => void;
  password: string;
  handleChangePassword: (password: string) => void;
  hasSubmittedEmail: boolean;
  isEmailVerified: boolean;
  cellphone: string;
  handleChangeCellphone: (cellphone: string) => void;
  hasSubmittedCellphone: boolean;
  pinCode: string;
  handleChangePinCode: (pinCode: string) => void;
  handleDismissKeyboard: () => void;
  handleSubmit: () => void;
  handleForgotPassword: () => void;
}

const SignInBase = ({
  isNewUser,
  isLoading,
  isDisabled,
  email,
  handleChangeEmail,
  password,
  handleChangePassword,
  hasSubmittedEmail,
  isEmailVerified,
  cellphone,
  handleChangeCellphone,
  hasSubmittedCellphone,
  pinCode,
  handleChangePinCode,
  handleSubmit,
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
                placeholder="EMAIL"
                keyboardType="email-address"
                value={email}
                autoFocus
                onChangeText={handleChangeEmail}
                onSubmitEditing={handleDismissKeyboard}
              />
            </SignInInputContainer>

            <SignInInputContainer>
              <Input
                placeholder="PASSWORD"
                secureTextEntry
                value={password}
                onChangeText={handleChangePassword}
                onSubmitEditing={handleSubmit}
              />
            </SignInInputContainer>

            <ForgotPasswordContainer>
              <Link onPress={handleForgotPassword}>Forgot password?</Link>
            </ForgotPasswordContainer>

            {hasSubmittedEmail && !isEmailVerified ? (
              <ParagraphText center>
                Please verify your email and open the app.
              </ParagraphText>
            ) : null}

            {isEmailVerified ? (
              hasSubmittedCellphone ? (
                <>
                  <PinCodeTextContainer>
                    <ParagraphText center>
                      Please enter the PIN code SMS'd to {cellphone}.
                    </ParagraphText>
                  </PinCodeTextContainer>

                  <SignInInputContainer>
                    <Input
                      placeholder="PIN CODE"
                      keyboardType="number-pad"
                      value={pinCode}
                      onChangeText={handleChangePinCode}
                    />
                  </SignInInputContainer>
                </>
              ) : (
                <SignInInputContainer>
                  <Input
                    placeholder="CELLPHONE"
                    keyboardType="number-pad"
                    value={cellphone}
                    onChangeText={handleChangeCellphone}
                  />
                </SignInInputContainer>
              )
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
  const isLoading = useSelector(selectIsAuthLoading);
  const isNewUser = true; // TODO
  const hasSubmittedEmail = false; // TODO
  const isEmailVerified = false; // TODO
  const hasSubmittedCellphone = false; // TODO
  const isDisabled = false; // TODO

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

    // TODO: depending on the state, do stuff, ie
    if (isNewUser) {
      dispatch(createUserWithEmailAndPassword(email, password));
    }
  }, [dispatch, isNewUser, email, password]);

  const onForgotPassword = useCallback(() => {
    // TODO
  }, []);

  return (
    <SignInBase
      isNewUser={isNewUser}
      isLoading={isLoading}
      isDisabled={isDisabled}
      email={email}
      handleChangeEmail={onChangeEmail}
      password={password}
      handleChangePassword={onChangePassword}
      hasSubmittedEmail={hasSubmittedEmail}
      isEmailVerified={isEmailVerified}
      cellphone={cellphone}
      handleChangeCellphone={onChangeCellphone}
      hasSubmittedCellphone={hasSubmittedCellphone}
      pinCode={pinCode}
      handleChangePinCode={onChangePinCode}
      handleDismissKeyboard={onDismissKeyboard}
      handleSubmit={onSubmit}
      handleForgotPassword={onForgotPassword}
    />
  );
};
