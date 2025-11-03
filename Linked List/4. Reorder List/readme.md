![Reorder List](/asset/images/ReorderList.png)
![Reorder List](/asset/images/ReorderList2.png)

-----

### 1\. Brute Force (Using an Array)

This method traverses the entire list, **storing each node in an array**. It then uses two pointers (one at the beginning, one at the end) to re-link the nodes in the array according to the new order. 🗂️

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
class Solution {
    /**
     * @param {ListNode} head
     * @return {void}
     */
    reorderList(head) {
        if (!head) return;

        const nodes = [];
        let cur = head;
        while (cur) {
            nodes.push(cur);
            cur = cur.next;
        }

        let i = 0,
            j = nodes.length - 1;
        while (i < j) {
            nodes[i].next = nodes[j];
            i++;
            if (i >= j) break;
            nodes[j].next = nodes[i];
            j--;
        }

        nodes[i].next = null;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n)$

-----

### 2\. Recursion

This is a less common solution that uses the **call stack** to perform the reordering. It recurses to the end of the list and, as the stack unwinds, it re-links the nodes from the outside in. 🌳

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
class Solution {
    /**
     * @param {ListNode} head
     * @return {void}
     */
    reorderList(head) {
        if (!head || !head.next) return;
        this.rec(head, head.next);
    }

    /**
     * @param {ListNode} root
     * @param {ListNode} cur
     * @return {ListNode}
     */
    rec(root, cur) {
        if (cur === null) {
            return root;
        }

        root = this.rec(root, cur.next);
        if (root === null) {
            return null;
        }

        let tmp = null;
        if (root === cur || root.next === cur) {
            cur.next = null; // Found the new middle, terminate
        } else {
            tmp = root.next;
            root.next = cur;
            cur.next = tmp;
        }

        return tmp; // Return the next node to process
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n)$ (due to the recursion call stack)

-----

### 3\. Reverse And Merge (Optimal)

This is the most efficient, in-place solution. It's a three-step process:

1.  **Find Middle:** Use a fast and slow pointer to find the middle of the list.
2.  **Reverse:** Split the list and reverse the entire second half.
3.  **Merge:** Interleave (merge) the nodes from the first half and the reversed second half. ✅

<!-- end list -->

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
class Solution {
    /**
     * @param {ListNode} head
     * @return {void}
     */
    reorderList(head) {
        // 1. Find the middle
        let slow = head;
        let fast = head.next;
        while (fast !== null && fast.next !== null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        // 2. Reverse the second half
        let second = slow.next;
        let prev = (slow.next = null); // Split the list
        while (second !== null) {
            const tmp = second.next;
            second.next = prev;
            prev = second;
            second = tmp;
        }

        // 3. Merge the two halves
        let first = head;
        second = prev; // 'prev' is now the head of the reversed half
        while (second !== null) {
            const tmp1 = first.next;
            const tmp2 = second.next;
            first.next = second;
            second.next = tmp1;
            first = tmp1;
            second = tmp2;
        }
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(1)$