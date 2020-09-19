import faker from 'faker';
import { Stock } from '../stocks/models';
import { Instructions } from '../instructions/models';

export const getMockStocks = (count: number = 10): Stock[] => {
  const getString = () => faker.random.words(1);
  const getCurrency = () => faker.random.number();
  const getInstruction = () =>
    faker.random.arrayElement([
      Instructions.buy,
      Instructions.hold,
      Instructions.sell,
    ]);

  return [...Array(count).keys()].map(() => {
    const stock: Stock = {
      currentPrice: getCurrency(),
      financialStatements: {
        balanceSheets: {},
        cashFlowStatements: {},
        incomeStatements: {},
      },
      historicalPricing: {},
      lastUpdated: getString(),
      profile: {
        address: getString(),
        description: getString(),
        industry: getString(),
        name: getString(),
        officers: [],
        phone: getString(),
        sector: getString(),
        webUrl: getString(),
      },
      sharesOutstanding: getCurrency(),
      symbol: getString(),
      valuation: {
        altmanZScore: getCurrency(),
        blendedMultiplier: getCurrency(),
        cr: getCurrency(),
        dcfIv: getCurrency(),
        dividendYield: getCurrency(),
        dte: getCurrency(),
        eps: getCurrency(),
        fairValue: getCurrency(),
        fcf: getCurrency(),
        grahamIv: getCurrency(),
        growthRate: getCurrency(),
        instruction: getInstruction(),
        liquidationIv: getCurrency(),
        marketCap: getCurrency(),
        pb: getCurrency(),
        pe: getCurrency(),
        peMultipleIv: getCurrency(),
        peg: getCurrency(),
        priceGrowthRate: getCurrency(),
        roa: getCurrency(),
        roe: getCurrency(),
        roeIv: getCurrency(),
        statementYears: getCurrency(),
        expectedReturn: getCurrency(),
      },
    };
    return stock;
  });
};
