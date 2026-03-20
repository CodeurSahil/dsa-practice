import heapq
import typing

class Solution:
    def networkDelayTime(self, times: typing.List[typing.List[int]], n: int, k: int) -> int:
        graph = {}

        for i in range(1, n + 1):
            graph[i] = []

        for src, dest, weight in times:
            graph[src].append((dest, weight))

        visited = set()
        heap = [(0, k)]
        time = 0

        while heap:
            w1, n1 = heapq.heappop(heap)

            if n1 in visited:
                continue

            visited.add(n1)
            time = w1

            for n2, w2 in graph[n1]:
                if n2 not in visited:
                    heapq.heappush(heap, (w1 + w2, n2))

        return time if len(visited) == n else -1