/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let maxProfit = 0;
    let minBuy = prices[0];

    for (const sellPrice of prices) {
        maxProfit = Math.max(maxProfit, sellPrice - minBuy);
        minBuy = Math.min(sellPrice, minBuy);
    }
    
    return maxProfit;
};