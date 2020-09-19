import React, { useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
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

export enum Screens {
  welcome = 'welcome',
  signIn = 'signIn',
  home = 'home',
}

export type RouteStackParamList = {
  [Screens.welcome]: undefined;
  [Screens.signIn]: undefined;
  [Screens.home]: undefined;
};

export type ScreenNavigationProps<T extends Screens> = StackNavigationProp<
  RouteStackParamList,
  T
>;

const Stack = createStackNavigator<RouteStackParamList>();

export const Router = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const hasSeenWelcome = useSelector(selectHasSeenWelcome);

  useEffect(() => {
    enableScreens();
  }, []);

  return (
    <NavigationContainer>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
