import { ScreenRouteProps, Screens } from '../Router';

export const makeRouteProps = <T extends Screens>({
  name,
  params,
}: Omit<ScreenRouteProps<T>, 'key'>) => ({
  key: '', // we don't really care about the key in testing
  name,
  params,
});
