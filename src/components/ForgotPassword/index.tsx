import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import { HeaderBar } from '../HeaderBar';
import { Input } from '../Input';
import Button, { ButtonKinds } from '../Button';
import { Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthLoading } from '../../auth/selectors';
import { Background } from '../Background';
import { PageHeader } from '../PageHeader';
import { dimensions } from '../../dimensions';
import { ScreenNavigationProps, Screens } from '../../Router';
import { validateEmail } from '../../utils/validateEmail';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ParagraphText } from '../ParagraphText';
import { selectSignInEmailFormField } from '../../forms/selectors';
import { setFormField } from '../../forms/actions';
import { Forms, SignInFields } from '../../forms/models';
import { sendPasswordResetEmail } from '../../auth/actions';

const ForgotPasswordContainer = styled.View`
  flex: 1;
  padding: ${dimensions.rhythm}px;
`;

const ForgotPasswordTextContainer = styled.View`
  margin-bottom: ${dimensions.rhythm}px;
`;

const ForgotPasswordInputsContainer = styled.View`
  max-width: 360px;
  width: 100%;
  align-self: center;
`;

const ForgotPasswordInputContainer = styled.View`
  margin-bottom: ${dimensions.rhythm}px;
  align-self: stretch;
`;

const ForgotPasswordFooterContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const ForgotPasswordSubmitButtonContainer = styled.View`
  margin: ${dimensions.rhythm}px 0;
  align-self: center;
`;

interface ForgotPasswordBaseProps {
  isLoading: boolean;
  isDisabled: boolean;
  email: string;
  isEmailValid: boolean;
  handleChangeEmail: (email: string) => void;
  handleSubmit: () => void;
}

const ForgotPasswordBase = ({
  isLoading,
  isDisabled,
  email,
  isEmailValid,
  handleChangeEmail,
  handleSubmit,
}: ForgotPasswordBaseProps) => {
  return (
    <Background>
      <HeaderBar showClose />

      <PageHeader>Forgot Password</PageHeader>

      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled">
        <ForgotPasswordContainer>
          <ForgotPasswordTextContainer>
            <ParagraphText>
              Please enter your email so that we can send you a password reset
              link.
            </ParagraphText>
          </ForgotPasswordTextContainer>

          <ForgotPasswordInputsContainer>
            <ForgotPasswordInputContainer>
              <Input
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                autoFocus
                isValid={isEmailValid}
                onChangeText={handleChangeEmail}
                onSubmitEditing={handleSubmit}
              />
            </ForgotPasswordInputContainer>
          </ForgotPasswordInputsContainer>

          <ForgotPasswordFooterContainer>
            <ForgotPasswordSubmitButtonContainer>
              <Button
                kind={isDisabled ? ButtonKinds.secondary : ButtonKinds.primary}
                loading={isLoading}
                disabled={isDisabled}
                onPress={handleSubmit}>
                SUBMIT
              </Button>
            </ForgotPasswordSubmitButtonContainer>
          </ForgotPasswordFooterContainer>
        </ForgotPasswordContainer>
      </KeyboardAwareScrollView>
    </Background>
  );
};

interface ForgotPasswordProps {
  navigation: ScreenNavigationProps<Screens.signIn>;
}

export const ForgotPassword = ({}: ForgotPasswordProps) => {
  const dispatch = useDispatch();
  const email = useSelector(selectSignInEmailFormField);
  const isEmailValid = validateEmail(email);
  const isLoading = useSelector(selectIsAuthLoading);
  const isDisabled = isLoading || !isEmailValid;

  const onChangeEmail = useCallback(
    (text: string) => {
      dispatch(setFormField(Forms.signIn, SignInFields.email, text));
    },
    [dispatch],
  );

  const onSubmit = useCallback(() => {
    Keyboard.dismiss();
    dispatch(sendPasswordResetEmail(email));
  }, [dispatch, email]);

  return (
    <ForgotPasswordBase
      isLoading={isLoading}
      isDisabled={isDisabled}
      email={email}
      isEmailValid={isEmailValid}
      handleChangeEmail={onChangeEmail}
      handleSubmit={onSubmit}
    />
  );
};
