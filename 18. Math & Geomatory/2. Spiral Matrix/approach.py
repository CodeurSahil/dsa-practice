class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        n, m = len(matrix), len(matrix[0])
        
        directions = [
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0]
        ]

        output = []

        def dfs(i, j, currDirIndex):
            output.append(matrix[i][j])
            matrix[i][j] = 'V'

            direction = directions[currDirIndex]
            di = i + direction[0]
            dj = j + direction[1]

            if di < 0 or dj < 0 or di == n or dj == m or matrix[di][dj] == 'V':
                currDirIndex += 1

                if currDirIndex == len(directions):
                    currDirIndex = 0

                direction = directions[currDirIndex]
                di = i + direction[0]
                dj = j + direction[1]

                if di < 0 or dj < 0 or di == n or dj == m or matrix[di][dj] == 'V':
                    return

            return dfs(i + direction[0], j + direction[1], currDirIndex)

        dfs(0, 0, 0)

        return output
        