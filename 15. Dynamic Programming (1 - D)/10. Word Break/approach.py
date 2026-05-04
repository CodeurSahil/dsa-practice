class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        memory = { len(s): True }

        def dfs(index):
            if index in memory:
                return memory[index]

            for word in wordDict:
                if (index + len(word) <= len(s) and s[index : index + len(word)] == word):
                    if dfs(index + len(word)):
                        memory[index] = True
                        return True
            
            memory[index] = False
            return False

        return dfs(0)