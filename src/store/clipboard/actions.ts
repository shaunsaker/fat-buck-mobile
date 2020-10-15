import { action } from 'typesafe-actions';
import { ClipboardActionTypes } from './models';

export const copyTextToClipboard = (text: string) =>
  action(ClipboardActionTypes.COPY_TEXT_TO_CLIPBOARD, {
    text,
  });
