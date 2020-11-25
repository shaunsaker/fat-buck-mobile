import { fireEvent } from '@testing-library/react-native';
import { mountComponent } from './mountComponent';

export const pressButton = ({
  component,
  buttonText,
}: {
  component: ReturnType<typeof mountComponent>;
  buttonText: string;
}) => {
  const { getByText } = component;

  fireEvent.press(getByText(buttonText));
};
