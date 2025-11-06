![Valid Palindrome](/asset/images/validPalindrome.png)

### 1\. Reverse String

This method first **builds a new, clean string** by iterating through the input, keeping only alphanumeric characters, and converting them to lowercase. Then, it simply checks if this new string is identical to its reverse. ⏪

```javascript
class Solution {
    /**
     * Check if a character is alphanumeric
     * @param {character} char
     * @return {boolean}
     */
    isAlphanumeric(char) {
        return (
            (char >= 'a' && char <= 'z') ||
            (char >= 'A' && char <= 'Z') ||
            (char >= '0' && char <= '9')
        );
    }

    /**
     * @param {string} s
     * @return {boolean}
     */
    isPalindrome(s) {
        let newStr = '';
        for (let c of s) {
            if (this.isAlphanumeric(c)) {
                newStr += c.toLowerCase();
            }
        }
        return newStr === newStr.split('').reverse().join('');
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$, for iterating through the string and reversing it.
  * **Space Complexity**: $O(n)$, to store the new filtered string.

-----

### 2\. Two Pointers

This is a more optimal, in-place approach. It uses **two pointers**, one starting from the beginning (`l`) and one from the end (`r`) of the string. The pointers move toward each other, skipping any non-alphanumeric characters. At each step, they compare the lowercase versions of the characters. If a mismatch is found, it's not a palindrome. ↔️

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isPalindrome(s) {
        let l = 0,
            r = s.length - 1;

        while (l < r) {
            while (l < r && !this.isAlphanumeric(s[l])) {
                l++;
            }
            while (r > l && !this.isAlphanumeric(s[r])) {
                r--;
            }
            if (s[l].toLowerCase() !== s[r].toLowerCase()) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }

    /**
     * @param {character} c
     * @return {boolean}
     */
    isAlphanumeric(c) {
        return (
            (c >= 'A' && c <= 'Z') ||
            (c >= 'a' && c <= 'z') ||
            (c >= '0' && c <= '9')
        );
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$, as each pointer traverses the string at most once.
  * **Space Complexity**: $O(1)$, as no extra data structures are needed.

-----

### 3\. Regular Expressions & Two Pointers

This is a concise and highly readable version that combines two techniques. It first uses a **regular expression to strip out all non-alphanumeric characters** and convert the string to lowercase in a single line. Then, it applies the efficient two-pointer method to the cleaned string. ✅

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    s = s.toLowerCase().replace(/[^a-z0-9]/g, "");
    
    let i = 0;
    let j = s.length - 1;
    
    while (i < j) {
        if (s[i] !== s[j]) return false;
        i++;
        j--;
    }
    return true;
};
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$, for the `replace` method and the two-pointer scan.
  * **Space Complexity**: $O(n)$, because the `replace` method creates a new string.