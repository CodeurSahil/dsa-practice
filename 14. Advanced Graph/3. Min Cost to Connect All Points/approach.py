class Solution:
    def minCostConnectPoints(self, points: List[List[int]]) -> int:
        n, node = len(points), 0
        dist = [1000000000] * n
        visited = [False] * n
        
        edge, res = 0, 0

        while edge < n - 1:
            visited[node] = True
            nextNode = -1

            for i in range(n):
                if visited[i]:
                    continue

                curDis = abs(
                    abs (
                        points[i][0] - points[node][0]
                    ) +
                    abs (
                        points[i][1] - points[node][1]
                    )
                )

                dist[i] = min(dist[i], curDis)

                if nextNode == -1 or dist[i] < dist[nextNode]:
                    nextNode = i

            res += dist[nextNode]
            node = nextNode
            edge += 1

        return res