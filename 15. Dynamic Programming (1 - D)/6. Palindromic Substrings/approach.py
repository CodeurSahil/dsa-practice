class Solution:
    def countSubstrings(self, s: str) -> int:
        strLen = len(s)
        substrCounter = 0

        dp = [[False] * strLen for _ in range(strLen)]

        for i in range(strLen - 1, -1, -1):
            for j in range(i, strLen):
                print(i, j)

                if s[i] == s[j] and (j - i <= 2 or dp[i + 1][j - 1]):
                    dp[i][j] = True
                    substrCounter += 1

        return substrCounter