import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { Action } from 'typesafe-actions';
import { Sentry } from '../../services/sentry';
import { Error } from './Error';

interface ConnectedErrorBoundaryProps {
  children: React.ReactNode;
  dispatch?: Dispatch<Action>; // FIXME: Why does the parent need to provide this?
}

interface ConnectedErrorBoundaryState {
  hasError: boolean;
}

class ConnectedErrorBoundary extends React.Component<
  ConnectedErrorBoundaryProps,
  ConnectedErrorBoundaryState
> {
  constructor(props: ConnectedErrorBoundaryProps) {
    super(props);

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

  render() {
    if (this.state.hasError) {
      return <Error />;
    }

    return this.props.children;
  }
}

export const ErrorBoundary = connect(null, null)(ConnectedErrorBoundary);
