import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components/native';
import { HeaderBar } from '../HeaderBar';
import { Input } from '../Input';
import Button, { ButtonKinds } from '../Button';
import { Keyboard, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { initiateSignIn, signIn } from '../../store/auth/actions';
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
import { validateEmail } from '../../utils/validateEmail';
import { validatePhoneNumber } from '../../utils/validatePhoneNumber';
import {
  selectSignInCellphoneFormField,
  selectSignInEmailFormField,
  selectSignInPasswordFormField,
  selectSignInPinCodeFormField,
} from '../../store/forms/selectors';
import { setFormField } from '../../store/forms/actions';
import { Forms, SignInFields } from '../../store/forms/models';
import { navigate, Screens } from '../../Router';
import {
  selectUserCellphone,
  selectUserEmail,
} from '../../store/user/selectors';
import { PhoneInput } from '../PhoneInput';
import { InputContainer } from '../InputContainer';
import { LayoutContainer } from '../LayoutContainer';
import { selectCountry } from '../../store/country/selectors';

const SignInContainer = styled.View`
  flex: 1;
`;

const SignInInputContainer = styled.View`
  margin-bottom: ${dimensions.rhythm}px;
  align-self: stretch;
`;

const SignInFooterContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

const SignInFooterTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SignInButtonContainer = styled.View`
  margin: ${dimensions.rhythm}px 0;
  align-self: center;
`;

const ForgotPasswordContainer = styled.View`
  align-items: flex-end;
  margin-bottom: ${dimensions.rhythm}px;
`;

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
  countryFlagEmoji: string;
  countryCallingCode: string;
  handleChangeCellphone: (cellphone: string) => void;
  handlePhoneInputCountryCodePress: () => void;
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
  countryFlagEmoji,
  countryCallingCode,
  handleChangeCellphone,
  handlePhoneInputCountryCodePress,
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

      <InputContainer>
        <PageHeader>Sign {isNewUser ? 'Up' : 'In'}</PageHeader>

        <SignInContainer>
          <LayoutContainer>
            <SignInInputContainer>
              <Input
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                autoFocus={!email}
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
                autoFocus={Boolean(email && !password)}
                isValid={isPasswordValid}
                onChangeText={handleChangePassword}
                onSubmitEditing={handleDismissKeyboard}
              />
            </SignInInputContainer>

            <ForgotPasswordContainer>
              <Link onPress={handleForgotPassword}>Forgot password?</Link>
            </ForgotPasswordContainer>

            <SignInInputContainer>
              <PhoneInput
                placeholder="833771133"
                value={cellphone}
                countryFlagEmoji={countryFlagEmoji}
                countryCallingCode={countryCallingCode}
                autoFocus={Boolean(email && password && !cellphone)}
                isValid={isCellphoneValid}
                onChangeText={handleChangeCellphone}
                onSubmitEditing={handleSubmit}
                onCountryCodePress={handlePhoneInputCountryCodePress}
              />
            </SignInInputContainer>

            {hasSubmitted ? (
              <>
                <PinCodeTextContainer>
                  <ParagraphText center>
                    Please enter the PIN code that we SMS'd to your number:{' '}
                    {countryCallingCode}
                    {cellphone}.
                  </ParagraphText>
                </PinCodeTextContainer>

                <SignInInputContainer>
                  <Input
                    placeholder="PIN Code"
                    keyboardType="number-pad"
                    value={pinCode}
                    isValid={isPinCodeValid}
                    autoFocus={Boolean(
                      email && password && cellphone && !pinCode,
                    )}
                    onChangeText={handleChangePinCode}
                    onSubmitEditing={handleSubmit}
                  />
                </SignInInputContainer>
              </>
            ) : null}
          </LayoutContainer>

          <SignInFooterContainer>
            <SignInFooterTextContainer>
              <ParagraphText>
                By signing {isNewUser ? 'up' : 'in'}, you agree to our{' '}
              </ParagraphText>
              <Link onPress={() => {}}>terms</Link>
              <ParagraphText>.</ParagraphText>
            </SignInFooterTextContainer>

            <SignInButtonContainer>
              <Button
                kind={ButtonKinds.primary}
                loading={isLoading}
                disabled={isDisabled}
                onPress={handleSubmit}>
                SUBMIT
              </Button>
            </SignInButtonContainer>
          </SignInFooterContainer>
        </SignInContainer>
      </InputContainer>
    </Background>
  );
};

export const SignIn = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectSignInEmailFormField);
  const password = useSelector(selectSignInPasswordFormField);
  const cellphone = useSelector(selectSignInCellphoneFormField);
  const pinCode = useSelector(selectSignInPinCodeFormField);
  const country = useSelector(selectCountry);
  const countryFlagEmoji = country.emoji;
  const countryCallingCode = country.countryCallingCodes[0];
  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 6;
  const parsedCellphone = `${countryCallingCode}${cellphone}`;
  const isCellphoneValid = validatePhoneNumber(parsedCellphone);
  const isPinCodeValid = pinCode.length >= 6;
  const isLoading = useSelector(selectIsAuthLoading);
  const isNewUser = useSelector(selectIsNewUser);
  const hasSubmitted = Boolean(useSelector(selectAuthConfirmationResult));
  const isDisabled =
    isLoading ||
    (hasSubmitted
      ? !isPinCodeValid
      : !isEmailValid || !isPasswordValid || !isCellphoneValid);
  const userEmail = useSelector(selectUserEmail);
  const userCellphone = useSelector(selectUserCellphone);

  useEffect(
    () => {
      // init with user values if present
      if (!email && userEmail) {
        onChangeEmail(userEmail);
      }
      if (!cellphone && userCellphone) {
        const parsedCellphone_ = userCellphone.replace(countryCallingCode, '');
        onChangeCellphone(parsedCellphone_);
      }
    },
    [], // eslint-disable-line
  );

  useEffect(() => {
    // if the country changes, reset the cellphone field
    // NOTE: this won't work if the user already has a cellphone saved to the store
    onChangeEmail('');
  }, [country, onChangeEmail]);

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

  const onPhoneInputCountryCodePress = useCallback(() => {
    navigate(Screens.countrySelector);
  }, []);

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
      dispatch(signIn(pinCode, email, password));
    } else {
      dispatch(initiateSignIn(parsedCellphone));
    }
  }, [dispatch, hasSubmitted, email, password, parsedCellphone, pinCode]);

  const onForgotPassword = useCallback(() => {
    navigate(Screens.forgotPassword);
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
      countryFlagEmoji={countryFlagEmoji}
      countryCallingCode={countryCallingCode}
      handleChangeCellphone={onChangeCellphone}
      handlePhoneInputCountryCodePress={onPhoneInputCountryCodePress}
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
