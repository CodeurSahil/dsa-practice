# Expand Around Corner's
class Solution:
    def longestPalindrome(self, s: str) -> str:
        if len(s) == 1:
            return s

        resLen = 1
        res = s[0]

        def expand(left, right):
            nonlocal resLen, res
            
            while left >= 0 and right < len(s) and s[right] == s[left]:
                length = right - left + 1

                if length > resLen:
                    resLen = length
                    res = s[left:right + 1]

                right += 1
                left -= 1

        for i in range(len(s)):
            expand(i, i)
            expand(i, i + 1)

        return res

# Not a Good One

class Solution:
    def longestPalindrome(self, s: str) -> str:
        if len(s) == 1:
            return s

        resLen = 1
        res = s[0]

        for i in range(len(s)):
            rightIndex, leftIndex = -1, -1

            if s[i - 1] == s[i + 1]:
                leftIndex = i - 1
                rightIndex = i + 1

            elif s[i] == s[i + 1]:
                leftIndex = i
                rightIndex = i + 1

            elif s[i] == s[i - 1]:
                leftIndex = i - 1
                rightIndex = i

            while leftIndex >= 0 and rightIndex < len(s) and s[rightIndex] == s[leftIndex]:
                length = rightIndex - leftIndex + 1

                if length > resLen:
                    resLen = length
                    res = s[leftIndex:rightIndex + 1]

                rightIndex = rightIndex + 1
                leftIndex = leftIndex - 1

        return res