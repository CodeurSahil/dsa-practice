![Evaluate Reverse Polish Notation](/asset/images/evaluateReversePolishNotation.png)
![Evaluate Reverse Polish Notation](/asset/images/evaluateReversePolishNotation2.png)

### 1\. Brute Force (Array Splicing)

This method works by repeatedly **scanning the array to find the first operator**. When one is found, it performs the calculation on the two preceding numbers and then uses `Array.prototype.splice()` to replace the operator and its operands with the result. This process continues until only one number remains in the array. 🐢

```javascript
class Solution {
    evalRPN(tokens) {
        while (tokens.length > 1) {
            for (let i = 0; i < tokens.length; i++) {
                if ('+-*/'.includes(tokens[i])) {
                    const a = parseInt(tokens[i - 2]);
                    const b = parseInt(tokens[i - 1]);
                    let result;
                    if (tokens[i] === '+') result = a + b;
                    else if (tokens[i] === '-') result = a - b;
                    else if (tokens[i] === '*') result = a * b;
                    else if (tokens[i] === '/') result = Math.trunc(a / b);

                    tokens.splice(i - 2, 3, result.toString());
                    break;
                }
            }
        }
        return parseInt(tokens[0]);
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n^2)$, because `splice` is an $O(n)$ operation, and it's called inside a loop.
  * **Space Complexity**: $O(1)$ extra space, as the input array is modified in place.

-----

### 2\. Doubly Linked List

To avoid the costly `splice` operation, this method first converts the input array into a **doubly linked list**. It then traverses the list, and when an operator node is found, it performs the calculation and efficiently modifies the list by re-linking the pointers of the surrounding nodes. 🔗

```javascript
class DoublyLinkedList {
    constructor(val, next = null, prev = null) {
        this.val = val;
        this.next = next;
        this.prev = prev;
    }
}

class Solution {
    evalRPN(tokens) {
        if (tokens.length === 1) return parseInt(tokens[0]);
        let head = new DoublyLinkedList(tokens[0]);
        let curr = head;

        for (let i = 1; i < tokens.length; i++) {
            curr.next = new DoublyLinkedList(tokens[i], null, curr);
            curr = curr.next;
        }

        while (curr.prev) {
             if ("+-*/".includes(curr.val)) {
                let right = parseInt(curr.prev.val);
                let left = parseInt(curr.prev.prev.val);
                let result;

                if (curr.val === "+") result = left + right;
                else if (curr.val === "-") result = left - right;
                else if (curr.val === "*") result = left * right;
                else result = Math.trunc(left / right);

                curr.prev.prev.val = result.toString();
                curr.prev.prev.next = curr.next;
                if (curr.next) curr.next.prev = curr.prev.prev;
            }
            curr = curr.prev;
        }
        return parseInt(curr.val);
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(n)$ for creating the linked list.

-----

### 3\. Recursion

This approach leverages the inherent recursive structure of RPN. It processes tokens from the end of the array. A recursive function `dfs` pops a token; if it's a number, it returns it. If it's an operator, it makes two recursive calls to get the right and left operands, performs the operation, and returns the result. 🌳

```javascript
class Solution {
    evalRPN(tokens) {
        const dfs = () => {
            const token = tokens.pop();
            if (!'+-*/'.includes(token)) {
                return parseInt(token);
            }

            const right = dfs();
            const left = dfs();

            if (token === '+') return left + right;
            if (token === '-') return left - right;
            if (token === '*') return left * right;
            return Math.trunc(left / right);
        };
        return dfs();
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(n)$ for the recursion call stack.

-----

### 4\. Stack (Optimal)

This is the classic and most efficient solution. It uses a **stack** to store operands. The algorithm iterates through the tokens: if the token is a number, it's pushed onto the stack. If it's an operator, the top two numbers are popped, the operation is performed, and the result is pushed back onto the stack. The final result is the last number remaining in the stack. ✅

```javascript
class Solution {
    evalRPN(tokens) {
        const stack = [];
        for (const c of tokens) {
            if (c === '+') {
                stack.push(stack.pop() + stack.pop());
            } else if (c === '-') {
                const a = stack.pop();
                const b = stack.pop();
                stack.push(b - a);
            } else if (c === '*') {
                stack.push(stack.pop() * stack.pop());
            } else if (c === '/') {
                const a = stack.pop();
                const b = stack.pop();
                stack.push(Math.trunc(b / a));
            } else {
                stack.push(parseInt(c));
            }
        }
        return stack.pop();
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(n)$ for the stack.