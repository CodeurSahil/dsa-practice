class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        TOTALSUM = sum(nums)

        if TOTALSUM % 2 != 0:
            return False

        TARGETSUM = TOTALSUM // 2
        dp = set()

        dp.add(0)

        for num in nums:
            nextDp = set()

            for rec in dp:
                if (num + rec) == TARGETSUM:
                    return True

                nextDp.add(num + rec)
                nextDp.add(rec)

            dp = nextDp

        return False
        

# MEMORY

class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        TOTALSUM = sum(nums)

        if TOTALSUM % 2 != 0:
            return False

        TARGETSUM = TOTALSUM // 2
        cache = {}

        def dfs(i, currSum):
            if currSum == TARGETSUM:
                return True

            if i >= len(nums) or currSum > TARGETSUM:
                return False

            if (i, currSum) in cache:
                return cache[(i, currSum)]

            skip = dfs(i + 1, currSum)
            take = dfs(i + 1, currSum + nums[i])

            cache[(i, currSum)] = skip or take

            return cache[(i, currSum)]

        return dfs(0, 0)
        