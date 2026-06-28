class Solution:
    def countBits(self, n: int) -> List[int]:
        # 7 = 3 + 1
        # 4 = 2 + 0

        dp = [0] * (n + 1)

        for i in range(n + 1):
            dp[i] = dp[i >> 1] + (i & 1)

        return dp