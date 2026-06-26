class Solution:
    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
        m, n = len(matrix), len(matrix[0])
        dp = {}

        def dfs(i, j, preVal):
            if (
                i < 0 or i == m or
                j < 0 or j == n or
                matrix[i][j] <= preVal
            ): 
                return 0

            if (i, j) in dp:
                return dp[(i, j)]

            res = 1
            res = max(res, 1 + dfs(i + 1, j, matrix[i][j]))
            res = max(res, 1 + dfs(i - 1, j, matrix[i][j]))
            res = max(res, 1 + dfs(i, j + 1, matrix[i][j]))
            res = max(res, 1 + dfs(i, j - 1, matrix[i][j]))

            dp[(i, j)] = res

            return dp[(i, j)]


        for i in range(m):
            for j in range(n):
                dfs(i, j, -1)

        return max(dp.values())