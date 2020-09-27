import React, { Dispatch } from 'react';
import { Sentry } from '../services/sentry';
import { Error } from './Error';
import RNRestart from 'react-native-restart';
import { persistor } from '../store';
import { Linking } from 'react-native';
import { showSnackbar } from '../store/actions';
import { CONTACT } from '../config';
import { connect } from 'react-redux';
import { Action } from 'typesafe-actions';

interface ErrorBoundaryBaseProps {
  children: React.ReactNode;
  dispatch?: Dispatch<Action>; // FIXME: Why does the parent need to provide this?
}

interface ErrorBoundaryBaseState {
  hasError: boolean;
}

const restartApp = () => {
  RNRestart.Restart();
};

class ErrorBoundaryBase extends React.Component<
  ErrorBoundaryBaseProps,
  ErrorBoundaryBaseState
> {
  constructor(props: ErrorBoundaryBaseProps) {
    super(props);

    this.onContactSupport = this.onContactSupport.bind(this);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    if (!__DEV__) {
      Sentry.captureException(error.message);
    }
  }

  onReloadApp() {
    restartApp();
  }

  async onClearCache() {
    await persistor.purge();
    restartApp();
  }

  async onContactSupport() {
    const url = `mailto:${CONTACT}`;
    const supported = await Linking.canOpenURL(url);
    const { dispatch } = this.props;

    if (supported) {
      await Linking.openURL(url);
    } else {
      // @ts-expect-error FIXME it's not undefined but I don't know how to type this correctly
      dispatch(showSnackbar(`Don't know how to open this URL: ${url}`));
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Error
          handleReloadApp={this.onReloadApp}
          handleClearCache={this.onClearCache}
          handleContactSupport={this.onContactSupport}
        />
      );
    }

    return this.props.children;
  }
}

export const ErrorBoundary = connect(null, null)(ErrorBoundaryBase);
