![PermutationinString](/asset/images/PermutationinString.png)

----

### 1\. Brute Force (Sorting)

This approach checks **every substring** of `s2` that has the same length as `s1`. For each substring, it sorts both the substring and `s1` and checks if they are identical. This is very inefficient due to repeated sorting. 🐢

```javascript
class Solution {
    /**
     * @param {string} s1
     * @param {string} s2
     * @return {boolean}
     */
    checkInclusion(s1, s2) {
        if (s1.length > s2.length) return false;
        s1 = s1.split('').sort().join('');

        for (let i = 0; i <= s2.length - s1.length; i++) {
            let subStr = s2
                .slice(i, i + s1.length)
                .split('')
                .sort()
                .join('');
            if (subStr === s1) {
                return true;
            }
        }
        return false;
    }
}
```

  * **Time Complexity**: $O(n \cdot m \log m)$, where $n$ is `s2.length` and $m$ is `s1.length`.
  * **Space Complexity**: $O(m)$ for sorting.

-----

### 2\. Hash Table (Frequency Check)

This method improves on the brute force by using a **hash map (or frequency array)** to check for permutations instead of sorting. It iterates through all possible start positions in `s2` and, for each, builds a frequency map of the corresponding substring, comparing it to the frequency map of `s1`.

```javascript
class Solution {
    /**
     * @param {string} s1
     * @param {string} s2
     * @return {boolean}
     */
    checkInclusion(s1, s2) {
        let count1 = {};
        for (let c of s1) {
            count1[c] = (count1[c] || 0) + 1;
        }
        let need = Object.keys(count1).length;

        for (let i = 0; i <= s2.length - s1.length; i++) {
            let count2 = {};
            let cur = 0;
            for (let j = i; j < i + s1.length; j++) {
                let c = s2[j];
                count2[c] = (count2[c] || 0) + 1;

                if ((count1[c] || 0) < count2[c]) {
                    break; // Too many of this char
                }
                if ((count1[c] || 0) === count2[c]) {
                    cur++;
                }
            }
            if (cur === need) {
                return true;
            }
        }
        return false;
    }
}
```

  * **Time Complexity**: $O(n \cdot m)$, where $n$ is `s2.length` and $m$ is `s1.length`.
  * **Space Complexity**: $O(1)$ (since there are at most 26 different characters).

-----

### 3\. Sliding Window (Optimal)

This is the most efficient solution. It uses a **sliding window** of a fixed size (`s1.length`) over `s2`. It maintains two frequency arrays (`s1Count` and `s2Count`) for the characters in `s1` and the current window in `s2`. By tracking the number of `matches` (characters with the same frequency in both maps), we can check for a permutation in $O(1)$ time at each step. ✅

```javascript
class Solution {
    /**
     * @param {string} s1
     * @param {string} s2
     * @return {boolean}
     */
    checkInclusion(s1, s2) {
        if (s1.length > s2.length) {
            return false;
        }

        let s1Count = new Array(26).fill(0);
        let s2Count = new Array(26).fill(0);
        // Initialize the first window
        for (let i = 0; i < s1.length; i++) {
            s1Count[s1.charCodeAt(i) - 97]++;
            s2Count[s2.charCodeAt(i) - 97]++;
        }

        let matches = 0;
        for (let i = 0; i < 26; i++) {
            if (s1Count[i] === s2Count[i]) {
                matches++;
            }
        }

        let l = 0;
        for (let r = s1.length; r < s2.length; r++) {
            if (matches === 26) {
                return true;
            }

            // Add the new character (r) to the window
            let index = s2.charCodeAt(r) - 97;
            s2Count[index]++;
            if (s1Count[index] === s2Count[index]) {
                matches++;
            } else if (s1Count[index] + 1 === s2Count[index]) {
                matches--;
            }

            // Remove the old character (l) from the window
            index = s2.charCodeAt(l) - 97;
            s2Count[index]--;
            if (s1Count[index] === s2Count[index]) {
                matches++;
            } else if (s1Count[index] - 1 === s2Count[index]) {
                matches--;
            }
            l++;
        }
        return matches === 26;
    }
}
```

  * **Time Complexity**: $O(n)$, where $n$ is the length of `s2`.
  * **Space Complexity**: $O(1)$ (for the fixed-size arrays).