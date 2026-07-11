class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        joined = ''.join(str(num) for num in digits)

        newNum = int(joined) + 1

        newList = []

        for i in list(str(newNum)):
            newList.append(int(i))

        return newList
