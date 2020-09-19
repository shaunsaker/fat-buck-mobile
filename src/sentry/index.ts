import * as Sentry from '@sentry/react-native';

if (!__DEV__) {
  Sentry.init({
    dsn:
      'https://1ec936caa19b4af19242541e152c48bb@o447395.ingest.sentry.io/5427197',
  });
}

export { Sentry };
