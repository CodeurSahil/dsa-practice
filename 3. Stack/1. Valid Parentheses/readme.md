![Valid Parentheses](/asset/images/validParentheses.png)
![Valid Parentheses2](/asset/images/validParentheses2.png)


### 1\. Brute Force (Replacements)

This approach works by **repeatedly finding and removing** valid, adjacent pairs of brackets (`()`, `{}`, `[]`) from the string. If the string is eventually empty after no more pairs can be removed, it's considered valid. While intuitive, this method can be slow for long, nested strings. 🐢

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isValid(s) {
        while (s.includes('()') || s.includes('{}') || s.includes('[]')) {
            s = s.replace('()', '');
            s = s.replace('{}', '');
            s = s.replace('[]', '');
        }
        return s === '';
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n^2)$, because each `replace` operation can take $O(n)$ time, and we might do this up to $O(n)$ times.
  * **Space Complexity**: $O(n)$, as each replacement in JavaScript can create a new string.

-----

### 2\. Stack (Optimal)

This is the classic and most efficient solution. It uses a **stack** to keep track of opening brackets. When an opening bracket is encountered, it's pushed onto the stack. When a closing bracket appears, we check if the top of the stack is its matching opening bracket. If it is, we pop from the stack; otherwise, the string is invalid. The string is valid if the stack is empty at the end. ✅

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isValid(s) {
        const stack = [];
        const closeToOpen = {
            ')': '(',
            ']': '[',
            '}': '{',
        };

        for (let c of s) {
            if (closeToOpen[c]) {
                if (
                    stack.length > 0 &&
                    stack[stack.length - 1] === closeToOpen[c]
                ) {
                    stack.pop();
                } else {
                    return false;
                }
            } else {
                stack.push(c);
            }
        }
        return stack.length === 0;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$, because we iterate through the string once.
  * **Space Complexity**: $O(n)$, for the stack in the worst case (e.g., a string of all opening brackets).