import React, { createRef, useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { SignIn } from './components/SignIn';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from './auth/selectors';
import { Home } from './components/Home';
import { Welcome } from './components/Welcome';
import { selectHasSeenWelcome } from './welcome/selectors';
import { ForgotPassword } from './components/ForgotPassword';

export enum Screens {
  welcome = 'welcome',
  signIn = 'signIn',
  forgotPassword = 'forgotPassword',
  home = 'home',
}

export type RouteStackParamList = {
  [Screens.welcome]: undefined;
  [Screens.signIn]: undefined;
  [Screens.forgotPassword]: undefined;
  [Screens.home]: undefined;
};

export type ScreenNavigationProps<T extends Screens> = StackNavigationProp<
  RouteStackParamList,
  T
>;

const Stack = createStackNavigator<RouteStackParamList>();

const navigationRef = createRef<NavigationContainerRef>();
export const navigate = <K extends keyof RouteStackParamList>(
  name: K,
  params?: RouteStackParamList[K],
) => {
  navigationRef.current?.navigate(name, params);
};

export const Router = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const hasSeenWelcome = useSelector(selectHasSeenWelcome);

  useEffect(() => {
    enableScreens();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator headerMode="none" mode="modal">
        {isAuthenticated ? (
          <Stack.Screen name={Screens.home} component={Home} />
        ) : (
          <>
            {!hasSeenWelcome ? (
              <Stack.Screen
                name={Screens.welcome}
                component={Welcome}
                options={{ animationEnabled: false }}
              />
            ) : null}

            <Stack.Screen
              name={Screens.signIn}
              component={SignIn}
              options={{ animationEnabled: !hasSeenWelcome }}
            />

            <Stack.Screen
              name={Screens.forgotPassword}
              component={ForgotPassword}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
