class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        n = len(nums)

        overallSum = n
        arrSum = 0

        for i in range(n):
            overallSum += i
            arrSum += nums[i]

        return overallSum - arrSum
