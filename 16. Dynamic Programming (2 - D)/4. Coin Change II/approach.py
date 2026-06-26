class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        TOTAL_COINS = len(coins)

        dp = [[0] * (amount + 1) for _ in range(TOTAL_COINS + 1)]

        for i in range(TOTAL_COINS + 1):
            dp[i][0] = 1

        for i in range(TOTAL_COINS - 1, -1, -1):
            for a in range(amount + 1):
                # SKIP
                dp[i][a] = dp[i + 1][a]

                if a >= coins[i]:
                    # Include
                    dp[i][a] += dp[i][a - coins[i]]

        return dp[0][amount]

        