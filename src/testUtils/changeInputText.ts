import { fireEvent } from '@testing-library/react-native';
import { mountComponent } from './mountComponent';

export const changeInputText = ({
  component,
  placeholderText,
  text,
}: {
  component: ReturnType<typeof mountComponent>;
  placeholderText: string;
  text: string;
}) => {
  const { getByPlaceholderText } = component;

  fireEvent.changeText(getByPlaceholderText(placeholderText), text);
};
