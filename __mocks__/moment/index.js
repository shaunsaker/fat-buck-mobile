export const MOCKED_MOMENT_ISO_STRING = '2018-08-26T19:17:02.349Z';

const mockedMoment = () =>
  jest.requireActual('moment')('2020-01-01T00:00:00.000Z');

export default mockedMoment;
