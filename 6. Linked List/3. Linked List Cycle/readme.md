![Linked List Cycle](/asset/images/LinkedListCycle.png)
![Linked List Cycle](/asset/images/LinkedListCycle2.png)

-----

### 1\. Hash Set

This method uses a **`Set`** to keep track of every node that has already been visited. While traversing the list, if a node is encountered that is already in the set, it means there is a cycle. 🗺️

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
     * @return {boolean}
     */
    hasCycle(head) {
        let seen = new Set();
        let cur = head;
        while (cur) {
            if (seen.has(cur)) {
                return true;
            }
            seen.add(cur);
            cur = cur.next;
        }
        return false;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n)$

-----

### 2\. Fast And Slow Pointers

This is the optimal, space-efficient solution, also known as **Floyd's Tortoise and Hare algorithm**. It uses two pointers: a `slow` pointer that moves one step at a time and a `fast` pointer that moves two steps. If there is a cycle, the `fast` pointer will eventually "lap" the `slow` pointer, and they will meet. 🐢🐇

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
     * @return {boolean}
     */
    hasCycle(head) {
        let fast = head;
        let slow = head;

        while (fast !== null && fast.next !== null) {
            fast = fast.next.next;
            slow = slow.next;

            if (fast === slow) {
                return true;
            }
        }

        return false;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(1)$