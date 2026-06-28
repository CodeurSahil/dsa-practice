class Solution:
    def reverseBits(self, n: int) -> int:
        bits = [0] * 32

        for i in range(32):
            bits[i] = n & 1
            n = n >> 1

        num = 0

        for i in range(32):
            num += pow(2, i) * bits[32 - (i + 1)]

        return num