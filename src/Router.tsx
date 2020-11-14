import React, { createRef, useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
import {
  NavigationContainer,
  NavigationContainerRef,
  RouteProp,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { SignIn } from './components/SignIn';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from './store/auth/selectors';
import { Home } from './components/Home';
import { Welcome } from './components/Welcome';
import { selectHasSeenWelcome } from './store/welcome/selectors';
import { ForgotPassword } from './components/ForgotPassword';
import { SideMenu } from './components/SideMenu';
import { CountrySelector } from './components/CountrySelector';
import { Deposit } from './components/Deposit';
import { EditWallet } from './components/EditWallet';
import { QRCodeScanner as QRCodeScannerComponent } from './components/QRCodeScanner';
import { DepositCalls } from './components/DepositCalls';
import { Profile } from './components/Profile';

export enum Screens {
  welcome = 'welcome',
  welcomeStatic = 'welcomeStatic',
  signIn = 'signIn',
  forgotPassword = 'forgotPassword',
  home = 'home',
  countrySelector = 'countrySelector',
  deposit = 'deposit',
  editWallet = 'editWallet',
  QRCodeScanner = 'QRCodeScanner',
  depositCalls = 'depositCalls',
  profile = 'profile',
}

export type RouteStackParamList = {
  [Screens.welcome]: undefined;
  [Screens.welcomeStatic]: undefined;
  [Screens.signIn]: undefined;
  [Screens.forgotPassword]: undefined;
  [Screens.home]: undefined;
  [Screens.countrySelector]: undefined;
  [Screens.deposit]: undefined;
  [Screens.editWallet]: { address: string } | undefined;
  [Screens.QRCodeScanner]: undefined;
  [Screens.depositCalls]: undefined;
  [Screens.profile]: undefined;
};

export type ScreenNavigationProps<T extends Screens> = StackNavigationProp<
  RouteStackParamList,
  T
>;

export type ScreenRouteProps<T extends Screens> = RouteProp<
  RouteStackParamList,
  T
>;

const Stack = createStackNavigator<RouteStackParamList>();

const navigationRef = createRef<NavigationContainerRef>();
export const navigate = <K extends keyof RouteStackParamList>(
  name?: K,
  params?: RouteStackParamList[K],
) => {
  if (!name) {
    // goBack
    navigationRef.current?.goBack();
  } else {
    navigationRef.current?.navigate(name, params);
  }
};

export const isCurrentRoute = (screenName: Screens) => {
  return navigationRef.current?.getCurrentRoute()?.name === screenName;
};

export const Router = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const hasSeenWelcome = useSelector(selectHasSeenWelcome);

  useEffect(() => {
    enableScreens();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <SideMenu>
        <Stack.Navigator headerMode="none" mode="modal">
          {isAuthenticated ? (
            <>
              <Stack.Screen name={Screens.home} component={Home} />

              <Stack.Screen name={Screens.welcomeStatic} component={Welcome} />

              <Stack.Screen name={Screens.deposit} component={Deposit} />

              <Stack.Screen name={Screens.editWallet} component={EditWallet} />

              <Stack.Screen
                name={Screens.QRCodeScanner}
                component={QRCodeScannerComponent}
              />

              <Stack.Screen
                name={Screens.depositCalls}
                component={DepositCalls}
              />

              <Stack.Screen name={Screens.profile} component={Profile} />
            </>
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

          <Stack.Screen
            name={Screens.countrySelector}
            component={CountrySelector}
          />
        </Stack.Navigator>
      </SideMenu>
    </NavigationContainer>
  );
};
