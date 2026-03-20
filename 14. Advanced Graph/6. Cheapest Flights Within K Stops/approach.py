class Solution:
    def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
        prices = [float("inf")] * n
        prices[src] = 0

        graph = [[] for _ in range(n)]

        for s, d, w in flights:
            graph[s].append((d, w))

        queue = deque([(0, src, 0)])

        while queue:
            w, s, stops = queue.popleft()

            if stops > k:
                continue

            for nei, cost in graph[s]:
                nextCost = w + cost

                if nextCost < prices[nei]:
                    prices[nei] = nextCost
                    queue.append((nextCost, nei, stops + 1))

        return prices[dst] if prices[dst] != float("inf") else -1



        