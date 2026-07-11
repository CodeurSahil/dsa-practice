# Time Limit Exceed

class Solution:
    def myPow(self, x: float, n: int) -> float:
        if n == 0:
            return 1
        if x == 0 or x == 1:
            return x

        isOdd = n % 2 != 0
        isNegative = n < 0

        if n == 1 or n == -1:
            return 1 / x if isNegative else x

        n = abs(n)

        half =  (n - 1) / 2 if isOdd else n / 2
        print(half)

        result = x

        for i in range(int(half) - 1):
            result *= x

        print(result)
        result = result * result * x if isOdd else result * result
        print(result)

        return 1 / result if isNegative else result
    

class Solution:
    def myPow(self, x: float, n: int) -> float:
        def helper(x, n):
            print(x, n)
            if x == 0:
                return 0
            if n == 0:
                return 1

            res = helper(x * x, n // 2)
            print(res)

            return x * res if n % 2 else res
            
        res = helper(x, abs(n))
        return res if n >= 0 else 1 / res