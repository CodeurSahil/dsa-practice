class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        cache = [[-1] * (n + 1) for _ in range (m)]

        def dfs(i, j):
            if i >= m or j >= n:
                return 0

            if i == m - 1 and j == n - 1:
                return 1

            if cache[i][j] != -1:
                return cache[i][j]

            cache[i][j] = dfs(i + 1, j) + dfs(i, j + 1)

            return cache[i][j]

        return dfs(0, 0);
        