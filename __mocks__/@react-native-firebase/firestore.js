import { getMockStocks } from '../../src/testUtils/getMockStocks';

export const TEST_EXCHANGES = [
  { name: 'AU', symbols: [] },
  { name: 'JSE', symbols: [] },
  { name: 'US', symbols: [] },
];

export const TEST_STOCKS = getMockStocks();

export default () => ({
  collection: jest.fn(() => ({
    get: () => ({
      docs: TEST_EXCHANGES.map((item) => {
        return {
          data: () => item,
        };
      }),
    }),
    doc: jest.fn(() => ({
      collection: () => ({
        where: () => ({
          orderBy: () => ({
            startAfter: () => ({
              limit: () => ({
                get: () => ({
                  docs: TEST_STOCKS.map((item) => {
                    return {
                      data: () => item,
                    };
                  }),
                }),
              }),
            }),
          }),
        }),
      }),
    })),
  })),
});
