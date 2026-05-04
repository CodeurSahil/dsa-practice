class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        cache = [-1] * len(cost)
        
        def dfs(index):
            if index >= len(cost):
                return 0

            if cache[index] != -1:
                return cache[index]

            cache[index] = cost[index] + min(dfs(index + 1), dfs(index + 2))
            return cache[index]

        return min(dfs(0), dfs(1))