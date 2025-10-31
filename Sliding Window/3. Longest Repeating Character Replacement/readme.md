![LongestRepeatingCharacterReplacement](/asset/images/LongestRepeatingCharacterReplacement.png)

-----

### 1\. Brute Force

This method checks **every possible substring**. For each substring starting at index `i` and ending at `j`, it counts the frequency of the most common character (`maxf`). If the number of other characters to replace (`length - maxf`) is less than or equal to `k`, the substring is valid, and we update our result. 🐢

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    characterReplacement(s, k) {
        let res = 0;
        for (let i = 0; i < s.length; i++) {
            let count = new Map();
            let maxf = 0;
            for (let j = i; j < s.length; j++) {
                count.set(s[j], (count.get(s[j]) || 0) + 1);
                maxf = Math.max(maxf, count.get(s[j]));
                if (j - i + 1 - maxf <= k) {
                    res = Math.max(res, j - i + 1);
                }
            }
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n^2)$
  * **Space complexity**: $O(m)$

(Where $n$ is the string length and $m$ is the size of the character set, at most 26.)

-----

### 2\. Sliding Window (Per Character)

This approach iterates through **each unique character in the alphabet** (e.g., 'A' through 'Z'). For each character, it uses a sliding window to find the longest substring where that character *could* be the repeating one (by replacing up to `k` other characters). It takes the maximum result from all these passes.

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    characterReplacement(s, k) {
        let res = 0;
        let charSet = new Set(s);

        for (let c of charSet) {
            let count = 0, // Count of the target character 'c'
                l = 0;
            for (let r = 0; r < s.length; r++) {
                if (s[r] === c) {
                    count++;
                }

                // Window is invalid if replacements needed > k
                while (r - l + 1 - count > k) {
                    if (s[l] === c) {
                        count--;
                    }
                    l++;
                }
                res = Math.max(res, r - l + 1);
            }
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(m \cdot n)$
  * **Space complexity**: $O(m)$

(Where $n$ is the string length and $m$ is the size of the character set.)

-----

### 3\. Sliding Window (Optimal)

This is the most efficient solution. It uses a **single sliding window** and a hash map to track the counts of all characters within that window. It also maintains `maxf`, the count of the *most frequent* character currently in the window. The window is valid as long as its length minus the count of the most frequent character (`windowLen - maxf`) is less than or equal to `k`. ✅

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    characterReplacement(s, k) {
        let count = new Map();
        let res = 0;

        let l = 0,
            maxf = 0;
        for (let r = 0; r < s.length; r++) {
            count.set(s[r], (count.get(s[r]) || 0) + 1);
            maxf = Math.max(maxf, count.get(s[r]));

            // If replacements needed > k, shrink the window
            while (r - l + 1 - maxf > k) {
                count.set(s[l], count.get(s[l]) - 1);
                l++;
                // Note: maxf doesn't need to be perfectly recalculated here,
                // as the window will only be valid again when maxf increases.
            }
            res = Math.max(res, r - l + 1);
        }

        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(m)$


### 4\. Sliding Window (Fixed-Size Array)

```javascript
/**
 * @param {string} s   // uppercase A-Z
 * @param {number} k   // max replacements
 * @return {number}    // longest valid window
 * Time: O(n), Space: O(1) (26 letters)
 */
function characterReplacement(s, k) {
  const freq = new Array(26).fill(0); // counts of letters in current window
  let left = 0;
  let maxFreq = 0;    // highest single-char frequency in the window
  let maxWindow = 0;  // best window length found

  for (let right = 0; right < s.length; right++) {
    const rIdx = s.charCodeAt(right) - 65; // 'A' = 65
    freq[rIdx]++;                           // update freq for s[right]
    if (freq[rIdx] > maxFreq) maxFreq = freq[rIdx]; // update max frequency

    // current window length
    let windowLen = right - left + 1;

    // if we need more than k replacements, shrink from the left
    if (windowLen - maxFreq > k) {
      const lIdx = s.charCodeAt(left) - 65;
      freq[lIdx]--;
      left++;
    }

    // update answer with the (possibly) shrunk window
    windowLen = right - left + 1;
    if (windowLen > maxWindow) maxWindow = windowLen;
  }

  return maxWindow;
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(1)$ (since the array size is fixed at 26).