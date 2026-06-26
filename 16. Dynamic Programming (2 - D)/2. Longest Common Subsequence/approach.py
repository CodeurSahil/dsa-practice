class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        M, N = len(text1), len(text2)
        dp = [0] * (N + 1)

        for i in range(M):
            newDp = [0] * (N + 1)

            for j in range(N):
                if text1[i] == text2[j]:
                    newDp[j + 1] = 1 + dp[j]
                else:
                    newDp[j + 1] = max(dp[j + 1], newDp[j])
                    
            dp = newDp

        return dp[N]
