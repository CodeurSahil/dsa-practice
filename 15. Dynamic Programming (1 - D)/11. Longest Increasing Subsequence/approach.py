class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        n = len(nums)
        memo = [-1] * n

        def dfs(i):
            if memo[i] != -1:
                return memo[i]

            LENLIS = 1

            for j in range(i + 1, n):
                if nums[i] < nums[j]:
                    LENLIS = max(LENLIS, 1 + dfs(j))
            
            memo[i] = LENLIS

            return LENLIS


        return max(dfs(i) for i in range(n))
        

