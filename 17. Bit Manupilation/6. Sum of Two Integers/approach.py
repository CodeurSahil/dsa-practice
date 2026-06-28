class Solution:
    def getSum(self, a: int, b: int) -> int:
        res = 0
        carry = 0

        mask = 0xFFFFFFFF

        for i in range(32):
            bit1 = (a >> i) & 1
            bit2 = (b >> i) & 1

            sum_of_bits = bit1 ^ bit2 ^ carry
            carry = (bit1 + bit2 + carry) >= 2

            if sum_of_bits:
                res |= (1 << i)

        if res > 0x7FFFFFFF:
            res = ~(res ^ mask)

        return res
        