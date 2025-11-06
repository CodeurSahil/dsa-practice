![Reverse Nodes in k-Group](/asset/images/ReverseNodesink-Group.png)
![Reverse Nodes in k-Group](/asset/images/ReverseNodesink-Group2.png)

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

This method uses the function call stack to manage the reversal process. It first checks if a full group of `k` nodes exists. If it does, it makes a **recursive call** on the rest of the list. As the stack unwinds, it reverses the current group of `k` nodes and connects it to the result from the recursive call. 🌳

```javascript
class Solution {
    /**
     * @param {ListNode} head
     * @param {number} k
     * @return {ListNode}
     */
    reverseKGroup(head, k) {
        let cur = head;
        let count = 0;
        // Check if there are at least k nodes left
        while (cur && count < k) {
            cur = cur.next;
            count++;
        }

        if (count === k) {
            // Recursively reverse the rest of the list
            cur = this.reverseKGroup(cur, k);
            // Reverse the current group
            while (count-- > 0) {
                let tmp = head.next;
                head.next = cur;
                cur = head;
                head = tmp;
            }
            head = cur;
        }
        return head;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n/k)$ (for the recursion stack)

-----

### 2\. Iteration (with Helper Function)

This is an iterative approach that uses a **dummy node** to simplify handling the head of the list. A `groupPrev` pointer tracks the node *before* each group. A helper function, `getKth`, is used to find the `k`-th node of the current group. The main loop then reverses the group in-place and reconnects the pointers. 🚶‍♂️

```javascript
class Solution {
    /**
     * @param {ListNode} head
     * @param {number} k
     * @return {ListNode}
     */
    reverseKGroup(head, k) {
        const dummy = new ListNode(0, head);
        let groupPrev = dummy;

        while (true) {
            const kth = this.getKth(groupPrev, k);
            if (!kth) {
                break;
            }
            const groupNext = kth.next;

            // Reverse the group
            let prev = kth.next;
            let curr = groupPrev.next;
            while (curr != groupNext) {
                const tmp = curr.next;
                curr.next = prev;
                prev = curr;
                curr = tmp;
            }

            const tmp = groupPrev.next; // Old start of the group
            groupPrev.next = kth;       // Connect previous part to the new start
            groupPrev = tmp;            // Move to the end of the reversed group
        }
        return dummy.next;
    }

    getKth(curr, k) {
        while (curr && k > 0) {
            curr = curr.next;
            k--;
        }
        return curr;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(1)$

-----

### 3\. Iteration (Concise)

This is a more streamlined iterative version without a separate helper function. It uses a `groupPrev` pointer to manage connections. The logic for finding the `kth` node and reversing the group is integrated directly into the main `while` loop. ✅

```javascript
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
    let dummy = new ListNode(0, head);
    let groupPrev = dummy;

    while(true){
        let kth = groupPrev;
        // Find the k-th node
        for(let i = 0; i < k; i++){
            kth = kth.next;
            if (!kth) return dummy.next; // Not enough nodes left
        }
        let groupNext = kth.next;
        
        // Reverse the group
        let prev = groupNext;
        let curr = groupPrev.next;

        for( let i = 0; i < k; i++){
            let tmp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = tmp;
        }

        let tmp = groupPrev.next;
        groupPrev.next = kth; // Connect to the new head of the group
        groupPrev = tmp;      // Move to the end of the reversed group
    }
};
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(1)$