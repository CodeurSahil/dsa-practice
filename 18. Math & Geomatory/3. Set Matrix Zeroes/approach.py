class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """
        n, m = len(matrix), len(matrix[0])
        zeroIndex = []

        dirs = [
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0]
        ]

        for i in range(n):
            for j in range(m):
                if matrix[i][j] == 0:
                    zeroIndex.append([i, j])
        
        def dfs(i, j, di, dj):
            if i < 0 or j < 0 or i >= n or j >= m:
                return

            matrix[i][j] = 0

            return dfs(i + di, j + dj, di, dj)

        for [i, j] in zeroIndex:
            for [di, dj] in dirs:
                dfs(i + di, j + dj, di, dj)


