class Solution:
    def isHappy(self, n: int) -> bool:
        validationSet = set()

        def process(num):
            if num == 1:
                return True
            
            if num in validationSet:
                return False

            validationSet.add(num)

            digits = list(str(num))

            newNum = 0

            for i in digits:
                newNum += pow(int(i), 2)

            return process(newNum)

        return process(n)