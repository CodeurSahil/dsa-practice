![Minimum Window Substring](/asset/images/MinimumWindowSubstring.png)
![Minimum Window Substring](/asset/images/MinimumWindowSubstring2.png)

-----

### 1\. Brute Force

This method checks **every possible substring** of `s`. For each substring, it builds a character frequency map and then verifies if that map contains all the characters required by `t`'s frequency map. If it does, and it's the smallest valid substring found so far, it's recorded. 🐢

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {string}
     */
    minWindow(s, t) {
        if (t === '') return '';

        let countT = {};
        for (let c of t) {
            countT[c] = (countT[c] || 0) + 1;
        }

        let res = [-1, -1];
        let resLen = Infinity;

        for (let i = 0; i < s.length; i++) {
            let countS = {};
            for (let j = i; j < s.length; j++) {
                countS[s[j]] = (countS[s[j]] || 0) + 1;

                let flag = true;
                for (let c in countT) {
                    if ((countS[c] || 0) < countT[c]) {
                        flag = false;
                        break;
                    }
                }

                if (flag && j - i + 1 < resLen) {
                    resLen = j - i + 1;
                    res = [i, j];
                }
            }
        }

        return resLen === Infinity ? '' : s.slice(res[0], res[1] + 1);
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n^2 \cdot m)$
  * **Space complexity**: $O(m)$

(Where $n$ is the length of string `s` and $m$ is the number of unique characters in `t`.)

-----

### 2\. Sliding Window (Optimal)

This is the highly efficient solution. It uses **two pointers** (`l` and `r`) to create a "sliding window" over `s`. It also uses two hash maps: one for the required characters in `t` (`countT`) and one for the characters in the current window (`window`).

1.  The right pointer `r` **expands** the window.
2.  We track how many of the needed character counts we `have` satisfied.
3.  Once `have` equals `need` (the window is valid), we record the result and **contract** the window from the left by moving `l` forward until the window is no longer valid.
4.  This process continues until `r` reaches the end of `s`. ✅

<!-- end list -->

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {string}
     */
    minWindow(s, t) {
        if (t === '') return '';

        let countT = {};
        let window = {};
        for (let c of t) {
            countT[c] = (countT[c] || 0) + 1;
        }

        let have = 0,
            need = Object.keys(countT).length;
        let res = [-1, -1];
        let resLen = Infinity;
        let l = 0;

        for (let r = 0; r < s.length; r++) {
            let c = s[r];
            window[c] = (window[c] || 0) + 1;

            if (countT[c] && window[c] === countT[c]) {
                have++;
            }

            while (have === need) {
                // Update result if this window is smaller
                if (r - l + 1 < resLen) {
                    resLen = r - l + 1;
                    res = [l, r];
                }

                // Shrink the window from the left
                window[s[l]]--;
                if (countT[s[l]] && window[s[l]] < countT[s[l]]) {
                    have--;
                }
                l++;
            }
        }

        return resLen === Infinity ? '' : s.slice(res[0], res[1] + 1);
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n+m)$
  * **Space complexity**: $O(m)$

(Where $n$ is the length of string `s` and $m$ is the number of unique characters in `t`.)