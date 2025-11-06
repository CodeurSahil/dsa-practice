![Add Two Numbers](/asset/images/AddTwoNumbers.png)
![Add Two Numbers](/asset/images/AddTwoNumbers2.png)

*A `ListNode` definition, as used in these examples:*

```javascript
/**
 * Definition for singly-linked list.
 * class ListNode {
 * constructor(val = 0, next = null) {
 * this.val = val;
 * this.next = next;
 * }
 * }
 */
```

-----

### 1\. Recursion

This approach uses the function call stack to perform the addition. It adds the values at the current nodes, calculates the `carry`, and then recursively calls itself to build the `next` node based on the remainder of the lists and the new carry. 🌳

```javascript
class Solution {
    /**
     * @param {ListNode} l1
     * @param {ListNode} l2
     * @param {number} carry
     * @return {ListNode}
     */
    add(l1, l2, carry) {
        if (!l1 && !l2 && carry === 0) {
            return null;
        }

        let v1 = 0;
        let v2 = 0;
        if (l1) {
            v1 = l1.val;
        }
        if (l2) {
            v2 = l2.val;
        }

        let sum = v1 + v2 + carry;
        let newCarry = Math.floor(sum / 10);
        let nodeValue = sum % 10;

        let nextNode = this.add(
            l1 ? l1.next : null,
            l2 ? l2.next : null,
            newCarry,
        );

        return new ListNode(nodeValue, nextNode);
    }

    /**
     * @param {ListNode} l1
     * @param {ListNode} l2
     * @return {ListNode}
     */
    addTwoNumbers(l1, l2) {
        return this.add(l1, l2, 0);
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(m + n)$
  * **Space complexity**: $O(m + n)$ (due to the recursion call stack)

(Where $m$ is the length of `l1` and $n$ is the length of `l2`.)

-----

### 2\. Iteration

This is the optimal, space-efficient solution. It uses a `dummy` head and a `cur` pointer to build the new list node by node. It iterates while either list has nodes or there is a `carry` value remaining. ✅

```javascript
class Solution {
    /**
     * @param {ListNode} l1
     * @param {ListNode} l2
     * @return {ListNode}
     */
    addTwoNumbers(l1, l2) {
        const dummy = new ListNode();
        let cur = dummy;

        let carry = 0;
        while (l1 || l2 || carry) {
            const v1 = l1 ? l1.val : 0;
            const v2 = l2 ? l2.val : 0;

            let val = v1 + v2 + carry;
            carry = Math.floor(val / 10);
            val = val % 10;
            cur.next = new ListNode(val);

            cur = cur.next;
            l1 = l1 ? l1.next : null;
            l2 = l2 ? l2.next : null;
        }

        return dummy.next;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(m + n)$
  * **Space complexity**: $O(1)$ extra space. $O(\max(m, n))$ for the output list.

(Where $m$ is the length of `l1` and $n$ is the length of `l2`.)