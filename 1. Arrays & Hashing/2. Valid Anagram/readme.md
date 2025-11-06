# 2. Valid Anagram

![Valid Anagram](/asset/images/ValidAnagram.png)


-----
## Approches
### 1\. Sorting

An anagram is a word formed by rearranging the letters of another. If you **sort the letters** of both strings, they will be identical if and only if they are anagrams. 🔡

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    isAnagram(s, t) {
        if (s.length !== t.length) {
            return false;
        }

        let sSort = s.split('').sort().join('');
        let tSort = t.split('').sort().join('');
        return sSort == tSort;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n \\log n + m \\log m)$
  * **Space Complexity**: $O(1)$ or $O(n+m)$, depending on the sorting algorithm's implementation.

(Where $n$ is the length of string $s$ and $m$ is the length of string $t$.)

-----

### 2\. Hash Map

This method uses a hash map (or a plain object in JavaScript) to **count the frequency of each character** in both strings. If the character counts are identical for both strings, they are anagrams. 📊

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    isAnagram(s, t) {
        if (s.length !== t.length) {
            return false;
        }

        const countS = {};
        const countT = {};
        for (let i = 0; i < s.length; i++) {
            countS[s[i]] = (countS[s[i]] || 0) + 1;
            countT[t[i]] = (countT[t[i]] || 0) + 1;
        }

        for (const key in countS) {
            if (countS[key] !== countT[key]) {
                return false;
            }
        }
        return true;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n+m)$
  * **Space Complexity**: $O(1)$, since the number of possible characters (e.g., lowercase English letters) is fixed at 26.

(Where $n$ is the length of string $s$ and $m$ is the length of string $t$.)

-----

### 3\. Hash Table (Using an Array)

This is an optimized version of the hash map approach, specifically for a known character set (like the 26 lowercase English letters). We use a **fixed-size array** as a frequency counter. We increment the count for characters in the first string and decrement for characters in the second. If the strings are anagrams, all counts in the array will be zero at the end. ✅

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    isAnagram(s, t) {
        if (s.length !== t.length) {
            return false;
        }

        const count = new Array(26).fill(0);
        for (let i = 0; i < s.length; i++) {
            count[s.charCodeAt(i) - 'a'.charCodeAt(0)]++;
            count[t.charCodeAt(i) - 'a'.charCodeAt(0)]--;
        }
        return count.every((val) => val === 0);
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n+m)$
  * **Space Complexity**: $O(1)$, because the array size is constant (26).

(Where $n$ is the length of string $s$ and $m$ is the length of string $t$.)