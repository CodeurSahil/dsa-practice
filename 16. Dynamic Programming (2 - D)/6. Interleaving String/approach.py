class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        m, n = len(s1), len(s2)

        if n + m != len(s3):
            return False

        if n < m:
            s1, s2 = s2, s1
            m, n = n, m

        dp = [False for _ in range(n + 1)]
        dp[n] = True

        for i in range(m, -1, -1):
            newDP = [False for _ in range(n + 1)]

            if i == m:
                newDP[n] = True

            for j in range(n, -1, -1):

                if i < m and s1[i] == s3[i + j] and dp[j]:
                    newDP[j] = True

                if j < n and s2[j] == s3[i + j] and newDP[j + 1]:
                    newDP[j] = True

            dp = newDP

        return dp[0]
    


class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        n, m = len(s1), len(s2)

        if n + m != len(s3):
            return False

        def dfs(stri, str1Index, str2Index):
            if stri == s3:
                return True

            if str1Index >= n and str2Index >= m:
                return False

            includeStr1, includeStr2 = False, False

            if str1Index < n:
                includeStr1 = dfs(stri + s1[str1Index], str1Index + 1, str2Index)
            
            if str2Index < m:
                includeStr2 = dfs(stri + s2[str2Index], str1Index, str2Index + 1)

            return includeStr1 or includeStr2

        return dfs('', 0, 0)

            

