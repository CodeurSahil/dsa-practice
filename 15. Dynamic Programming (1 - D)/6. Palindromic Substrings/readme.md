![Palindromic Substrings](/asset/images/PalindromicSubstrings.png)

---

### 1. Brute Force

**Intuition:**
The most straightforward method is to generate every possible substring and check if it reads the same forwards and backwards using two pointers.

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    countSubstrings(s) {
        let res = 0;

        for (let i = 0; i < s.length; i++) {
            for (let j = i; j < s.length; j++) {
                let l = i;
                let r = j;
                
                // Check if the current substring s[i..j] is a palindrome
                while (l < r && s[l] === s[r]) {
                    l++;
                    r--;
                }
                
                // If pointers cross or meet, it's a valid palindrome
                if (l >= r) {
                    res++;
                }
            }
        }

        return res;
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: **O(n³)**. Generating all substrings takes **O(n²)**, and verifying each takes up to **O(n)** time.
* **Space Complexity**: **O(1)**. We only use a few integer variables.

---

### 2. Dynamic Programming

**Intuition:**
We can avoid re-checking the inner parts of substrings by remembering past results. A substring `s[i..j]` is a palindrome if its outer characters match (`s[i] === s[j]`) AND the substring inside it is also a palindrome (`dp[i+1][j-1]`). 

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    countSubstrings(s) {
        const n = s.length;
        let res = 0;
        
        // dp[i][j] will be true if substring s[i..j] is a palindrome
        const dp = Array.from({ length: n }, () => Array(n).fill(false));

        // Traverse bottom to top so inner substrings are evaluated first
        for (let i = n - 1; i >= 0; i--) {
            for (let j = i; j < n; j++) {
                if (s[i] === s[j] && (j - i <= 2 || dp[i + 1][j - 1])) {
                    dp[i][j] = true;
                    res++;
                }
            }
        }

        return res;
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: **O(n²)**. We process every pair of indices.
* **Space Complexity**: **O(n²)** to store the 2D DP table.

---

### 3. Two Pointers (Inline Expand Around Center)

**Intuition:**
A palindrome always expands symmetrically from its center. Odd-length palindromes have a single character center, while even-length palindromes have a center between two characters. We can iterate through the string and expand outward from every possible center.

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    countSubstrings(s) {
        let res = 0;

        for (let i = 0; i < s.length; i++) {
            // 1. Odd length palindromes
            let l = i, r = i;
            while (l >= 0 && r < s.length && s[l] === s[r]) {
                res++;
                l--;
                r++;
            }

            // 2. Even length palindromes
            l = i;
            r = i + 1;
            while (l >= 0 && r < s.length && s[l] === s[r]) {
                res++;
                l--;
                r++;
            }
        }

        return res;
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: **O(n²)**. In the worst case (e.g., "aaaaa"), we expand **O(n)** times for each center.
* **Space Complexity**: **O(1)**. Only a few pointers are used.

---

### 4. Two Pointers (Optimal / Modular)

**Intuition:**
This is the exact same logic as approach #3, but extracted into a helper function to keep the code DRY (Don't Repeat Yourself), clean, and modular.

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    countSubstrings(s) {
        let res = 0;

        // Helper function to expand outward from a given center
        const countPali = (l, r) => {
            let count = 0;
            while (l >= 0 && r < s.length && s[l] === s[r]) {
                count++;
                l--;
                r++;
            }
            return count;
        };

        for (let i = 0; i < s.length; i++) {
            res += countPali(i, i);     // Odd-length center
            res += countPali(i, i + 1); // Even-length center
        }

        return res;
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: **O(n²)**.
* **Space Complexity**: **O(1)**.

---

### 5. Manacher's Algorithm

**Intuition:**
Manacher's Algorithm optimizes the "Expand Around Center" approach to linear time by reusing previously computed palindrome radii. It inserts `#` separators to uniformly handle odd and even-length palindromes, then uses a tracking window `[l, r]` to mirror expansion lengths whenever a new center falls inside a previously found palindrome.

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    countSubstrings(s) {
        // Transform string: "abc" -> "#a#b#c#"
        const t = '#' + s.split('').join('#') + '#';
        const n = t.length;
        
        // p[i] will store the radius of the palindrome centered at i
        const p = new Array(n).fill(0);
        let l = 0;
        let r = 0;

        for (let i = 0; i < n; i++) {
            // Mirror previous results if inside the current right-most boundary
            if (i < r) {
                p[i] = Math.min(r - i, p[l + (r - i)]);
            }

            // Expand outward
            while (
                i + p[i] + 1 < n && 
                i - p[i] - 1 >= 0 && 
                t[i + p[i] + 1] === t[i - p[i] - 1]
            ) {
                p[i]++;
            }

            // Update the right-most boundary if we expanded past it
            if (i + p[i] > r) {
                l = i - p[i];
                r = i + p[i];
            }
        }

        // Convert the radii in the transformed string back to counts
        let res = 0;
        for (const radius of p) {
            res += Math.floor((radius + 1) / 2);
        }

        return res;
    }
}
```
#### **Time & Space Complexity**
* **Time Complexity**: **O(n)**. The right boundary `r` only ever moves forward, making the total expansion work linear.
* **Space Complexity**: **O(n)** to store the transformed string and the radius array `p`.