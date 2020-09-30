export const MOCKED_MOMENT_ISO_STRING = '12345678';

export default () => ({
  toISOString: () => MOCKED_MOMENT_ISO_STRING,
});
