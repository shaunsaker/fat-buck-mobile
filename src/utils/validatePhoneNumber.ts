import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const validatePhoneNumber = (str: string) => {
  const phoneNumber = parsePhoneNumberFromString(str);
  return Boolean(phoneNumber?.isValid());
};
