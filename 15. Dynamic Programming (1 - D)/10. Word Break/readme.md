![Word Break](/asset/images/WordBreak.png)
![Word Break](/asset/images/WordBreak2.png)

---

### 1. Recursion (Brute Force)

**Intuition:**
We start at the beginning of the string. We try every word in the dictionary to see if it matches the start of our remaining string. If it does, we "cut" that word off and recursively check the rest of the string. If we ever reach the end of the string, it means we found a valid segmentation! 🐢

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string[]} wordDict
     * @return {boolean}
     */
    wordBreak(s, wordDict) {
        const dfs = (i) => {
            // Base case: Reached the end of the string successfully
            if (i === s.length) {
                return true;
            }

            // Try every word in the dictionary
            for (const w of wordDict) {
                // If the word fits and matches the substring
                if (i + w.length <= s.length && s.substring(i, i + w.length) === w) {
                    // Recursively check the rest of the string
                    if (dfs(i + w.length)) {
                        return true;
                    }
                }
            }
            return false;
        };

        return dfs(0);
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(t \cdot m^n)$, where $n$ is the length of `s`, $m$ is the number of words in `wordDict`, and $t$ is the max length of a word. The recursion tree branches heavily. Will Time Limit Exceed.
* **Space Complexity**: $O(n)$ for the recursion stack.

---

### 2. Dynamic Programming (Top-Down / Memoization)

**Intuition:**
The recursive approach repeatedly asks the same question: "Can the substring starting at index `i` be segmented?" We can optimize this by caching the result for each index `i`. If we visit an index we've already evaluated, we simply return the cached `true` or `false` result.

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string[]} wordDict
     * @return {boolean}
     */
    wordBreak(s, wordDict) {
        // Cache: index -> boolean
        const memo = new Map();
        // Base case is cached
        memo.set(s.length, true);

        const dfs = (i) => {
            if (memo.has(i)) {
                return memo.get(i);
            }

            for (const w of wordDict) {
                if (i + w.length <= s.length && s.substring(i, i + w.length) === w) {
                    if (dfs(i + w.length)) {
                        memo.set(i, true);
                        return true;
                    }
                }
            }
            
            memo.set(i, false);
            return false;
        };

        return dfs(0);
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n \cdot m \cdot t)$. We evaluate each of the $n$ indices once. At each index, we iterate through $m$ words, and substring comparison takes $O(t)$.
* **Space Complexity**: $O(n)$ for the memo map and recursion stack.

---

### 3. Dynamic Programming (Top-Down / Hash Set Optimized)

**Intuition:**
Instead of checking every dictionary word at every index, we can put the dictionary into a Hash Set for $O(1)$ lookups. Then, from index `i`, we just check all possible substrings up to the maximum word length. This is faster when the dictionary is very large but the words are relatively short.

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string[]} wordDict
     * @return {boolean}
     */
    wordBreak(s, wordDict) {
        const wordSet = new Set(wordDict);
        let maxLen = 0;
        for (const w of wordDict) {
            maxLen = Math.max(maxLen, w.length);
        }

        const memo = new Map();

        const dfs = (i) => {
            if (memo.has(i)) return memo.get(i);
            if (i === s.length) return true;

            // Only check substrings up to the maximum dictionary word length
            for (let j = i; j < Math.min(s.length, i + maxLen); j++) {
                const sub = s.substring(i, j + 1);
                
                if (wordSet.has(sub)) {
                    if (dfs(j + 1)) {
                        memo.set(i, true);
                        return true;
                    }
                }
            }
            
            memo.set(i, false);
            return false;
        };

        return dfs(0);
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(t^2 \cdot n + m)$. Generating substrings of length up to $t$ takes $O(t^2)$. We do this for $n$ indices.
* **Space Complexity**: $O(n + m \cdot t)$ for the memo map, set, and recursion stack.

---

### 4. Dynamic Programming (Bottom-Up)

**Intuition:**
Instead of starting from the front and recursing, we start from the back of the string. We define a `dp` array where `dp[i]` is `true` if the substring `s[i:]` can be segmented.
To find `dp[i]`, we check if any dictionary word matches the string starting at `i`. If it does, and the *rest* of the string after that word (`dp[i + w.length]`) is also `true`, then `dp[i]` becomes `true`. ✅

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string[]} wordDict
     * @return {boolean}
     */
    wordBreak(s, wordDict) {
        const n = s.length;
        // dp[i] represents if s[i:] can be segmented
        const dp = new Array(n + 1).fill(false);
        
        // Base case: an empty string (at the very end) is a valid segmentation
        dp[n] = true;

        // Work backward from the end of the string
        for (let i = n - 1; i >= 0; i--) {
            for (const w of wordDict) {
                // If the word fits and matches
                if (i + w.length <= n && s.substring(i, i + w.length) === w) {
                    // Check if the remaining suffix is valid
                    dp[i] = dp[i + w.length];
                }
                
                // Optimization: if we found a valid segmentation from index i, stop checking other words
                if (dp[i]) {
                    break;
                }
            }
        }

        // Return whether the entire string (starting at index 0) can be segmented
        return dp[0];
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n \cdot m \cdot t)$. Two nested loops and a substring comparison.
* **Space Complexity**: $O(n)$ for the DP array.