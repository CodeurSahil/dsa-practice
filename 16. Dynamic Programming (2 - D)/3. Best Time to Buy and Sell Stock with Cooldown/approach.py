class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        dataLen = len(prices)
        cache = {}
        
        def dfs(i, isBuying):
            if i >= dataLen:
                return 0

            if (i, isBuying) in cache:
                return cache[(i, isBuying)]


            if isBuying:
                buy = dfs(i + 1, not isBuying) - prices[i]
                cooldown = dfs(i + 1, isBuying)

                cache[(i, isBuying)] = max(buy, cooldown)

            else:
                sell = dfs(i + 2, not isBuying) + prices[i]
                cooldown = dfs(i + 1, isBuying)

                cache[(i, isBuying)] = max(sell, cooldown)

            return cache[(i, isBuying)]

        return dfs(0, True)


        