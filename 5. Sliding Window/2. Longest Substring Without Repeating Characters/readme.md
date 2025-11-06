![LongestSubstringWithoutRepeatingCharacters](/asset/images/LongestSubstringWithoutRepeatingCharacters.png)

-----

### 1\. Brute Force

This method checks **every possible substring**. It uses two nested loops: the outer loop (`i`) defines the start of the substring, and the inner loop (`j`) expands it to the right, using a `Set` to check for duplicate characters. 🐢

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    lengthOfLongestSubstring(s) {
        let res = 0;
        for (let i = 0; i < s.length; i++) {
            let charSet = new Set();
            for (let j = i; j < s.length; j++) {
                if (charSet.has(s[j])) {
                    break;
                }
                charSet.add(s[j]);
            }
            res = Math.max(res, charSet.size);
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n^2)$
  * **Space complexity**: $O(m)$

(Where $n$ is the string length and $m$ is the size of the character set.)

-----

### 2\. Sliding Window with Set

This is a more efficient approach that uses a **sliding window**. The window is represented by a "left" pointer (`l`) and a "right" pointer (`r`). A `Set` is used to keep track of characters currently in the window. As the right pointer expands the window, if a duplicate is found, the left pointer contracts the window (removing characters from the set) until the duplicate is gone. ↔️

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    lengthOfLongestSubstring(s) {
        const charSet = new Set();
        let l = 0;
        let res = 0;

        for (let r = 0; r < s.length; r++) {
            while (charSet.has(s[r])) {
                charSet.delete(s[l]);
                l++;
            }
            charSet.add(s[r]);
            res = Math.max(res, r - l + 1);
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(m)$

(Where $n$ is the string length and $m$ is the size of the character set.)

-----

### 3\. Sliding Window (Optimized with Map)

This is the most optimal solution. It also uses a sliding window but replaces the `Set` with a **`Map` that stores the *last seen index* of each character**. When a duplicate is found (the character is in the map), the left pointer can **jump directly** to the position *after* the last time that character was seen, avoiding the slow, one-by-one contraction of the window. ✅

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    lengthOfLongestSubstring(s) {
        let mp = new Map(); // char -> last_seen_index
        let l = 0,
            res = 0;

        for (let r = 0; r < s.length; r++) {
            if (mp.has(s[r])) {
                // We only jump forward, in case the last seen
                // index is behind our current 'l' pointer.
                l = Math.max(mp.get(s[r]) + 1, l);
            }
            mp.set(s[r], r);
            res = Math.max(res, r - l + 1);
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(m)$

(Where $n$ is the string length and $m$ is the size of the character set.)