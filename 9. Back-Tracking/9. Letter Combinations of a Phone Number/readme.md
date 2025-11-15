![Letter Combinations of a Phone Number](/asset/images/LetterCombinationsofaPhoneNumber.png)
![Letter Combinations of a Phone Number](/asset/images/LetterCombinationsofaPhoneNumber2.png)

-----

### 1\. Backtracking

This is the classic recursive approach. It uses a **Depth First Search (DFS)** to explore the "tree" of combinations. The function builds a string `curStr` and, for each digit, recursively calls itself for every possible letter. 🌳

```javascript
class Solution {
    /**
     * @param {string} digits
     * @return {string[]}
     */
    letterCombinations(digits) {
        let res = [];
        if (digits.length === 0) return res;
        const digitToChar = {
            2: 'abc',
            3: 'def',
            4: 'ghi',
            5: 'jkl',
            6: 'mno',
            7: 'qprs',
            8: 'tuv',
            9: 'wxyz',
        };

        const backtrack = (i, curStr) => {
            if (curStr.length === digits.length) {
                res.push(curStr);
                return;
            }
            for (const c of digitToChar[digits[i]]) {
                backtrack(i + 1, curStr + c);
            }
        };
        backtrack(0, '');
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n \cdot 4^n)$
  * **Space complexity**: $O(n)$ (for the recursion stack, not counting output)

-----

### 2\. Iteration (BFS-like)

This iterative approach builds the combinations level by level, similar to a Breadth-First Search (BFS). It starts with a list containing an empty string `['']`. For each digit, it creates a new temporary list by appending each of the digit's letters to all the strings currently in the result list. 🌊

```javascript
class Solution {
    /**
     * @param {string} digits
     * @return {string[]}
     */
    letterCombinations(digits) {
        if (digits.length === 0) return [];

        let res = [''];
        const digitToChar = {
            2: 'abc',
            3: 'def',
            4: 'ghi',
            5: 'jkl',
            6: 'mno',
            7: 'qprs',
            8: 'tuv',
            9: 'wxyz',
        };

        for (const digit of digits) {
            const tmp = [];
            for (const curStr of res) {
                for (const c of digitToChar[digit]) {
                    tmp.push(curStr + c);
                }
            }
            res = tmp;
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n \cdot 4^n)$
  * **Space complexity**: $O(n \cdot 4^n)$ (to store the `res` list as it grows)