class Solution:
    def hammingWeight(self, n: int) -> int:
        bit = 0

        while n > 0:
            if n & 1 == 1:
                bit += 1

            n = n >> 1

        return bit
        