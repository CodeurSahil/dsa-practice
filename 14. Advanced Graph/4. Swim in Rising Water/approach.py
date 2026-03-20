class Solution:
    def swimInWater(self, grid: List[List[int]]) -> int:
        n = len(grid)

        validDir = [
            [0, 1],
            [1, 0],
            [-1, 0],
            [0, -1]
        ]

        graph = {}

        for i in range(n):
            for j in range(n):
                key = f"{i}-{j}"
                graph[key] = []

                for di, dj in validDir:
                    x, y = i + di, j + dj

                    if x < 0 or y < 0 or x >= n or y >= n:
                        continue

                    weight = grid[x][y]

                    graph[key].append((weight, x, y))

        # print(graph)

        time = grid[0][0]

        heap = []
        for (w2, x2, y2) in graph["0-0"]:
            heapq.heappush(heap, (w2, x2, y2))

        visited = set(["0-0"])

        while heap:
            # print(heap)
            w, x, y = heapq.heappop(heap)

            if time < w:
                time = w
            
            if x == n - 1 and y == n - 1:
                break

            visited.add(f"{x}-{y}")

            for w2, x2, y2 in graph[f"{x}-{y}"]:
                if f"{x2}-{y2}" not in visited:
                    heapq.heappush(heap, (w2, x2, y2))

        return time

