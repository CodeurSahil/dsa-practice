![Reverse Linked List](/asset/images/ReverseLinkedList.png)
![Reverse Linked List](/asset/images/ReverseLinkedList2.png)

-----

### 1\. Recursion

This approach uses the function call stack to reverse the list. It recursively travels to the end of the list, which becomes the new head. As the functions return, the pointers are reversed one by one. 🌳

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
     * @return {ListNode}
     */
    reverseList(head) {
        if (!head) {
            return null;
        }

        let newHead = head;
        if (head.next) {
            newHead = this.reverseList(head.next);
            head.next.next = head;
        }
        head.next = null;

        return newHead;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n)$, due to the recursion call stack.

-----

### 2\. Iteration

This is the optimal, space-efficient solution. It iterates through the list, using `prev` and `curr` pointers to reverse the direction of each node's `next` pointer as it goes. ✅

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
     * @return {ListNode}
     */
    reverseList(head) {
        let prev = null;
        let curr = head;

        while (curr) {
            let temp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = temp;
        }
        return prev;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(1)$