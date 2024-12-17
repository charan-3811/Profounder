const fs = require('fs');

// Function to generate random trading log for each person
function generateTradingLog(numTrades, activeDays) {
  const log = [];
  for (let i = 0; i < numTrades; i++) {
    const openTime = new Date(Date.now() - Math.floor(Math.random() * activeDays * 24 * 60 * 60 * 1000));
    const closeTime = new Date(openTime.getTime() + Math.floor(Math.random() * (1440 * 60 * 1000))); // Up to 1 day after open
    const symbol = ['AAPL', 'GOOGL', 'AMZN', 'MSFT', 'TSLA'][Math.floor(Math.random() * 5)];
    const positionId = Math.floor(Math.random() * 90000) + 10000;
    const tradeType = ['BUY', 'SELL'][Math.floor(Math.random() * 2)];
    const volume = Math.floor(Math.random() * 91) + 10;
    const openPrice = (Math.random() * (2000 - 100) + 100).toFixed(2);
    const closePrice = (parseFloat(openPrice) + (Math.random() * 100 - 50)).toFixed(2); // Close price within +/- 50
    const profit = (parseFloat(closePrice) - parseFloat(openPrice)) * volume;
    const change = (((parseFloat(closePrice) - parseFloat(openPrice)) / parseFloat(openPrice)) * 100).toFixed(2);

    log.push({
      openTime: openTime.toISOString().slice(0, 19).replace('T', ' '),
      symbol: symbol,
      positionId: positionId,
      type: tradeType,
      volume: volume,
      openPrice: parseFloat(openPrice),
      closeTime: closeTime.toISOString().slice(0, 19).replace('T', ' '),
      closePrice: parseFloat(closePrice),
      profit: profit.toFixed(2),
      change: change
    });
  }
  return log;
}

// Function to generate data for each person
function generateMemberData() {
  const startingBalance = (Math.random() * (100000 - 5000) + 5000).toFixed(2);
  const cumulativePnl = (Math.random() * (5000 - -2000) + -2000).toFixed(2);
  const currentBalance = (parseFloat(startingBalance) + parseFloat(cumulativePnl)).toFixed(2);
  const currentEquity = (parseFloat(currentBalance) + (Math.random() * 1000 - 500)).toFixed(2);  // Slight variation in equity
  const percentReturn = ((parseFloat(cumulativePnl) / parseFloat(startingBalance)) * 100).toFixed(2);
  const activeDays = Math.floor(Math.random() * (365 - 30) + 30);
  const avgWinningTrade = (Math.random() * (1000 - 100) + 100).toFixed(2);
  const profitFactor = (Math.random() * (3.0 - 1.2) + 1.2).toFixed(2);
  const numTrades = Math.floor(Math.random() * (200 - 50) + 50);
  const tradingLog = generateTradingLog(numTrades, activeDays);

  return {
    name: `Person ${Math.floor(Math.random() * 1000) + 1}`,
    startingBalance: parseFloat(startingBalance),
    currentEquity: parseFloat(currentEquity),
    currentBalance: parseFloat(currentBalance),
    cumulativePnl: parseFloat(cumulativePnl),
    percentReturn: parseFloat(percentReturn),
    activeDays: activeDays,
    avgWinningTrade: parseFloat(avgWinningTrade),
    profitFactor: parseFloat(profitFactor),
    numTradesPlaced: numTrades,
    tradingLog: tradingLog
  };
}

// Generate data for 100 members
function main() {
  const membersData = Array.from({ length: 100 }, generateMemberData);

  // Save data to a JSON file
  fs.writeFileSync('data.json', JSON.stringify(membersData, null, 4));

  console.log("File saved as 'data.json'");
}

main();
