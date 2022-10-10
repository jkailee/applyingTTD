const stockTicker = require('./stockTicker.js');
//import Stocks from './stockTicker.js'

beforeEach(() => {
    portfolio = new stockTicker.Portfolio();
})

test('Testing isMT, portfolio will answer if it is empty, portfolio will start empty -- success', () => {
    const result = portfolio.isMT();
    expect(result).toBeTruthy();
})

test('Testing size, portfolio will answer how number of unique ticker symbols -- success', () => {
    portfolio.stockList = [{name: 'GME', shares: 5}, {name: 'RBLX', shares: 10}];
    const result = portfolio.size();
    const target = 2;
    expect(result).toBe(target);
})

test('Testing Buy, Buying a stock that is not in portfolio will increase portfolio size -- success', () => {
    portfolio.buy('JOBY', 12);
    const result = portfolio.size();
    const target = 1;
    expect(result).toBe(target);
})

test('Testing Buy, Buying a stock that is in portfolio will not increase portfolio size, only number of shares -- success', () => {
    portfolio.buy('JOBY', 12);
    portfolio.buy('JOBY', 12);
    const result = portfolio.size();
    const target = 1;
    expect(result).toBe(target);
})

test('Testing Sell, Buying and then selling all shares will result in empty portfolio -- success', () => {
    portfolio.buy('AMZN', 2);
    portfolio.sell('AMZN', 2);
    const result = portfolio.size();
    const target = 0;
    expect(result).toBe(target);
})

test('Testing sell, selling a share that does not exist will do nothing -- success', () => {
    portfolio.sell('AMZN', 2);
    const result = portfolio.size();
    const target = 0;
    expect(result).toBe(target);
})

test('Testing howMany, portfolio will tell you how many shares of a certain ticker you have -- success', () => {
    portfolio.buy('AMZN', 2);
    const result = portfolio.howMany('AMZN');
    const target = 2;
    expect(result).toBe(target);
})

test('Testing howMany, portfolio will tell you how many shares of a certain ticker you have, zero if the stock is not in the portfolio -- success', () => {
    portfolio.buy('AMZN', 2);
    const result = portfolio.howMany('JOBY');
    const target = 0;
    expect(result).toBe(target);
})

test('Testing buy, trying to sell too many shares throws error', () => {
    portfolio.buy('AMZN', 2);
    expect(() => {
        portfolio.sell('AMZN', 5);
    }).toThrowError('ShareSaleException');
})