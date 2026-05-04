![Longest Palindromic Substring](/asset/images/LongestPalindromicSubstring.png)

---

### 1. Brute Force

**Intuition:**
The most straightforward approach is to check every possible substring. We use two nested loops to define the start and end of a substring, and then we use two pointers to check if that specific substring reads the same forwards and backwards. 🐢

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    longestPalindrome(s) {
        let res = "";
        let resLen = 0;

        for (let i = 0; i < s.length; i++) {
            for (let j = i; j < s.length; j++) {
                let l = i;
                let r = j;
                
                // Check if the current substring s[i..j] is a palindrome
                while (l < r && s[l] === s[r]) {
                    l++;
                    r--;
                }
                
                // If it is a palindrome and longer than our current best
                if (l >= r && (j - i + 1) > resLen) {
                    res = s.substring(i, j + 1);
                    resLen = j - i + 1;
                }
            }
        }
        return res;
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n^3)$. Generating all substrings takes $O(n^2)$, and verifying each takes $O(n)$.
* **Space Complexity**: $O(n)$ to store the result string.

---

### 2. Dynamic Programming

**Intuition:**
We can avoid re-checking the inner parts of substrings by remembering past results. A substring is a palindrome if its outer characters match AND the substring inside it is also a palindrome. 
We use a 2D `dp` array where `dp[i][j]` is `true` if `s[i..j]` is a palindrome. We fill this table from bottom to top so that the smaller inner substrings are already evaluated.

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    longestPalindrome(s) {
        const n = s.length;
        let resIdx = 0;
        let resLen = 0;

        // dp[i][j] will be true if substring s[i..j] is a palindrome
        const dp = Array.from({ length: n }, () => Array(n).fill(false));

        // Fill from bottom to top
        for (let i = n - 1; i >= 0; i--) {
            for (let j = i; j < n; j++) {
                // Characters must match. 
                // Also, it's a palindrome if length is 1-3 OR the inner substring is a palindrome.
                if (s[i] === s[j] && (j - i <= 2 || dp[i + 1][j - 1])) {
                    dp[i][j] = true;
                    
                    if ((j - i + 1) > resLen) {
                        resIdx = i;
                        resLen = j - i + 1;
                    }
                }
            }
        }

        return s.substring(resIdx, resIdx + resLen);
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n^2)$. We process every pair of indices.
* **Space Complexity**: $O(n^2)$ to store the 2D DP table.

---

### 3. Two Pointers (Expand Around Center)

**Intuition:**
This is typically the most practical and expected interview solution. Instead of checking boundaries inward, we pick a center and expand outward. A palindrome can be centered on a single character (odd length, like "aba") or between two characters (even length, like "abba"). We try expanding from every possible center in the string. ✅

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    longestPalindrome(s) {
        let resIdx = 0;
        let resLen = 0;

        for (let i = 0; i < s.length; i++) {
            // 1. Odd length palindromes (centered on a character)
            let l = i, r = i;
            while (l >= 0 && r < s.length && s[l] === s[r]) {
                if ((r - l + 1) > resLen) {
                    resIdx = l;
                    resLen = r - l + 1;
                }
                l--;
                r++;
            }

            // 2. Even length palindromes (centered between characters)
            l = i;
            r = i + 1;
            while (l >= 0 && r < s.length && s[l] === s[r]) {
                if ((r - l + 1) > resLen) {
                    resIdx = l;
                    resLen = r - l + 1;
                }
                l--;
                r++;
            }
        }

        return s.substring(resIdx, resIdx + resLen);
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n^2)$. In the worst case (e.g., "aaaaa"), we expand $O(n)$ times for each of the $n$ centers.
* **Space Complexity**: $O(1)$. We only use a few pointers.

---

### 4. Manacher's Algorithm

**Intuition:**
This is a highly optimized, linear-time algorithm. It cleverly utilizes symmetry to avoid redundant palindrome expansions. 
It first transforms the string by inserting a special character (like `#`) between every letter to eliminate the difference between odd and even length palindromes. It then uses previously computed palindrome radii to jump-start the expansion of new centers. *(Note: This is rarely expected in standard interviews, but it's an impressive flex).*

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    longestPalindrome(s) {
        // Transform the string: "babad" -> "#b#a#b#a#d#"
        const t = '#' + s.split('').join('#') + '#';
        const n = t.length;
        
        // p[i] will store the radius of the longest palindrome centered at i
        const p = new Array(n).fill(0);
        let l = 0; // Left boundary of the current right-most palindrome
        let r = 0; // Right boundary of the current right-most palindrome

        for (let i = 0; i < n; i++) {
            // If i is within our current known right-most palindrome, 
            // we can mirror the radius from the left side.
            if (i < r) {
                p[i] = Math.min(r - i, p[l + (r - i)]);
            } else {
                p[i] = 0;
            }

            // Expand around center i
            while (
                i + p[i] + 1 < n && 
                i - p[i] - 1 >= 0 && 
                t[i + p[i] + 1] === t[i - p[i] - 1]
            ) {
                p[i]++;
            }

            // If this new palindrome extends further right than our current one, update l and r
            if (i + p[i] > r) {
                l = i - p[i];
                r = i + p[i];
            }
        }

        // Find the maximum radius in the p array
        let resLen = 0;
        let centerIdx = 0;
        for (let i = 0; i < n; i++) {
            if (p[i] > resLen) {
                resLen = p[i];
                centerIdx = i;
            }
        }

        // Map back to the original string indices
        const resIdx = Math.floor((centerIdx - resLen) / 2);
        return s.substring(resIdx, resIdx + resLen);
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: $O(n)$. Despite the inner `while` loop, the right boundary `r` only moves forward and can move at most $2n$ times.
* **Space Complexity**: $O(n)$ to store the transformed string and the radius array `p`.

---

### 5. Two Pointers (Modular Helper Function)

This is a fantastic and very common variation of the **Two Pointers (Expand Around Center)** approach. By extracting the expansion logic into a helper function, the code becomes much more modular, readable, and DRY (Don't Repeat Yourself).

**Intuition:**
The logic is identical to the standard Expand Around Center approach. However, instead of writing the `while` loop twice (once for odd-length and once for even-length palindromes), we encapsulate it in a closure function `expand(left, right)`. We then call this function twice for every index in the string.

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    longestPalindrome(s) {
        if (s.length === 1) {
            return s;
        }

        let resLen = 1;
        let res = s[0];

        // Helper function to expand outward from a given center
        const expand = (left, right) => {
            while (left >= 0 && right < s.length && s[left] === s[right]) {
                const length = right - left + 1;

                if (length > resLen) {
                    resLen = length;
                    res = s.substring(left, right + 1);
                }

                left--;
                right++;
            }
        };

        for (let i = 0; i < s.length; i++) {
            expand(i, i);       // Check for odd-length palindrome
            expand(i, i + 1);   // Check for even-length palindrome
        }

        return res;
    }
}
```

#### **Time & Space Complexity**
* **Time Complexity**: $O(n^2)$. Expanding around the center takes $O(n)$ time in the worst case, and we do this $2n$ times.
* **Space Complexity**: $O(1)$. We are only allocating a few variables for pointers and length tracking, modifying them in place via the closure.