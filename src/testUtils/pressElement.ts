import { fireEvent } from '@testing-library/react-native';
import { mountComponent } from './mountComponent';

export const pressElement = ({
  component,
  testId,
}: {
  component: ReturnType<typeof mountComponent>;
  testId: string;
}) => {
  const { getByTestId } = component;

  fireEvent.press(getByTestId(testId));
};
