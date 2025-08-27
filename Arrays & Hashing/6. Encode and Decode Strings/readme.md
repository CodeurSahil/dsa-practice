![Encode and Decode Strings](/asset/images/encodeAndDecodeStrings.png)

-----

## Solution

### 1\. Encoding & Decoding (Two-Part Structure)

This method encodes the list of strings into a single string by creating two distinct parts. First, it creates a header containing the **comma-separated lengths of all strings**, followed by a `#` delimiter. The second part is simply all the original strings concatenated together. 📜

```javascript
class Solution {
    /**
     * @param {string[]} strs
     * @returns {string}
     */
    encode(strs) {
        if (strs.length === 0) return '';
        let sizes = [],
            res = '';
        for (let s of strs) {
            sizes.push(s.length);
        }
        for (let sz of sizes) {
            res += sz + ',';
        }
        res += '#';
        for (let s of strs) {
            res += s;
        }
        return res;
    }

    /**
     * @param {string} str
     * @returns {string[]}
     */
    decode(str) {
        if (str.length === 0) return [];
        let sizes = [],
            res = [],
            i = 0;
        while (str[i] !== '#') {
            let cur = '';
            while (str[i] !== ',') {
                cur += str[i];
                i++;
            }
            sizes.push(parseInt(cur));
            i++;
        }
        i++; // Skip the '#'
        for (let sz of sizes) {
            res.push(str.substr(i, sz));
            i += sz;
        }
        return res;
    }
}
```

#### Time & Space Complexity

  * **Time Complexity**: $O(m)$ for both `encode()` and `decode()`.
  * **Space Complexity**: $O(m+n)$ for both `encode()` and `decode()` to store the result.

(Where $m$ is the sum of the lengths of all strings and $n$ is the number of strings.)

-----

### 2\. Encoding & Decoding (Optimal Chunking)

This is a more robust and common approach. It avoids a separate header by encoding each string as a **`length#string` chunk**. All these chunks are then concatenated together. The decoder reads the length before the `#`, knows exactly how many characters to read for the string, and repeats the process until the end. This is a self-contained and efficient format. 🧩

```javascript
class Solution {
    /**
     * @param {string[]} strs
     * @returns {string}
     */
    encode(strs) {
        let res = '';
        for (let s of strs) {
            res += s.length + '#' + s;
        }
        return res;
    }

    /**
     * @param {string} str
     * @returns {string[]}
     */
    decode(str) {
        let res = [];
        let i = 0;
        while (i < str.length) {
            let j = i;
            while (str[j] !== '#') {
                j++;
            }
            let length = parseInt(str.substring(i, j));
            i = j + 1;
            j = i + length;
            res.push(str.substring(i, j));
            i = j;
        }
        return res;
    }
}
```

#### Time & Space Complexity

  * **Time Complexity**: $O(m)$ for both `encode()` and `decode()`.
  * **Space Complexity**: $O(m+n)$ for both `encode()` and `decode()` to store the result.

(Where $m$ is the sum of the lengths of all strings and $n$ is the number of strings.)