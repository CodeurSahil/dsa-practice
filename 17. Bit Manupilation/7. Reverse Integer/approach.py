class Solution:
    def reverse(self, x: int) -> int:

        # 123 - 001111011
        # 321 - 101000001
        
        MAX = (1 << 31) - 1
        MIN = -(1 << 31)

        res = 0
        symbol = -1 if x < 0 else 1
        x = abs(x)

        while x:
            digit = int(x % 10)
            x = int(x / 10)

            res = (res * 10) + digit

        res *= symbol

        if res > MAX or res < MIN:
            return 0
        
        return res
