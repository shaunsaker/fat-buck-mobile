import React, { useCallback, useState } from 'react';
import styled from 'styled-components/native';
import { HeaderBar } from '../HeaderBar';
import { Input } from '../Input';
import Button, { ButtonKinds } from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthLoading } from '../../store/auth/selectors';
import { Background } from '../Background';
import { PageHeader } from '../PageHeader';
import { validateEmail } from '../../utils/validateEmail';
import { ParagraphText } from '../ParagraphText';
import { sendPasswordResetEmail } from '../../store/auth/actions';
import { InputContainer } from '../InputContainer';
import { LayoutContainer } from '../LayoutContainer';
import { RHYTHM } from '../../constants';
import { selectUserEmail } from '../../store/user/selectors';
import { dismissKeyboard } from '../../store/services/actions';

export const FORGOT_PASSWORD_EMAIL_PLACEHOLDER_TEXT = 'Enter your email...';
export const FORGOT_PASSWORD_SUBMIT_BUTTON_TEXT = 'SUBMIT';

const ForgotPasswordContainer = styled.View`
  flex: 1;
`;

const ForgotPasswordTextContainer = styled.View`
  margin-bottom: ${RHYTHM}px;
`;

const ForgotPasswordInputContainer = styled.View`
  margin-bottom: ${RHYTHM}px;
  align-self: stretch;
`;

const ForgotPasswordFooterContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const ForgotPasswordSubmitButtonContainer = styled.View`
  margin: ${RHYTHM}px 0;
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

      <InputContainer>
        <ForgotPasswordContainer>
          <LayoutContainer>
            <ForgotPasswordTextContainer>
              <ParagraphText center>
                Please enter your email so that we can send you a password reset
                link.
              </ParagraphText>
            </ForgotPasswordTextContainer>

            <ForgotPasswordInputContainer>
              <Input
                placeholder={FORGOT_PASSWORD_EMAIL_PLACEHOLDER_TEXT}
                keyboardType="email-address"
                value={email}
                autoFocus
                isValid={isEmailValid}
                onChangeText={handleChangeEmail}
                onSubmitEditing={handleSubmit}
              />
            </ForgotPasswordInputContainer>
          </LayoutContainer>

          <ForgotPasswordFooterContainer>
            <ForgotPasswordSubmitButtonContainer>
              <Button
                kind={isDisabled ? ButtonKinds.secondary : ButtonKinds.primary}
                loading={isLoading}
                disabled={isDisabled}
                onPress={handleSubmit}>
                {FORGOT_PASSWORD_SUBMIT_BUTTON_TEXT}
              </Button>
            </ForgotPasswordSubmitButtonContainer>
          </ForgotPasswordFooterContainer>
        </ForgotPasswordContainer>
      </InputContainer>
    </Background>
  );
};

export const ForgotPassword = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector(selectUserEmail);
  const [email, setEmail] = useState(userEmail || '');
  const isEmailValid = validateEmail(email);
  const isLoading = useSelector(selectIsAuthLoading);
  const isDisabled = isLoading || !isEmailValid;

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const onSubmit = useCallback(() => {
    dispatch(dismissKeyboard());
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
