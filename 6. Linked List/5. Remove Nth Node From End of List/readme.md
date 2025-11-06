![Remove Nth Node From End of List](/asset/images/RemoveNthNodeFromEndofList.png)

-----

### 1\. Brute Force (Using an Array)

This method traverses the list once to **store all nodes in an array**. It then uses the array's length to calculate the index of the node to be removed and performs the re-linking. 🗂️

```javascript
class Solution {
    /**
     * @param {ListNode} head
     * @param {number} n
     * @return {ListNode}
     */
    removeNthFromEnd(head, n) {
        const nodes = [];
        let cur = head;
        while (cur) {
            nodes.push(cur);
            cur = cur.next;
        }

        const removeIndex = nodes.length - n;
        if (removeIndex === 0) {
            return head.next;
        }

        nodes[removeIndex - 1].next = nodes[removeIndex].next;
        return head;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(N)$
  * **Space complexity**: $O(N)$

-----

### 2\. Iteration (Two Pass)

This method avoids extra space by performing **two passes**. The first pass counts the total number of nodes `N`. The second pass traverses the list again to the `(N - n)`th node to find the node *before* the target, which is then re-linked. 🔢

```javascript
class Solution {
    /**
     * @param {ListNode} head
     * @param {number} n
     * @return {ListNode}
     */
    removeNthFromEnd(head, n) {
        let N = 0;
        let cur = head;
        while (cur) {
            N++;
            cur = cur.next;
        }

        const removeIndex = N - n;
        if (removeIndex === 0) {
            return head.next;
        }

        cur = head;
        // Traverse to the node *before* the one to be removed
        for (let i = 0; i < removeIndex - 1; i++) {
            cur = cur.next;
        }

        cur.next = cur.next.next;
        return head;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(N)$
  * **Space complexity**: $O(1)$

-----

### 3\. Recursion

This approach recurses to the end of the list. As the call stack unwinds, a **counter is decremented**. When the counter reaches zero, it signifies that the current node is the Nth from the end and should be skipped by returning `head.next`. 🌳

```javascript
class Solution {
    /**
     * @param {ListNode} head
     * @param {number[]} n
     * @return {ListNode}
     */
    rec(head, n) {
        if (!head) {
            return null;
        }

        head.next = this.rec(head.next, n);
        n[0]--; // Decrement the counter as the stack unwinds
        if (n[0] === 0) {
            return head.next; // Skip this node
        }
        return head;
    }

    /**
     * @param {ListNode} head
     * @param {number} n
     * @return {ListNode}
     */
    removeNthFromEnd(head, n) {
        // We use an array [n] so 'n' is passed by reference
        return this.rec(head, [n]);
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(N)$
  * **Space complexity**: $O(N)$ (for the recursion stack)

-----

### 4\. Two Pointers (One Pass)

This is the optimal solution. It uses a **dummy head** (to handle the edge case of removing the first node) and **two pointers**, `left` and `right`. The `right` pointer is first advanced `n` steps. Then, both pointers move in lockstep until `right` reaches the end of the list. At this point, `left` will be at the node *before* the one to be removed. ✅

```javascript
class Solution {
    /**
     * @param {ListNode} head
     * @param {number} n
     * @return {ListNode}
     */
    removeNthFromEnd(head, n) {
        const dummy = new ListNode(0, head);
        let left = dummy;
        let right = head;

        while (n > 0) {
            right = right.next;
            n--;
        }

        while (right !== null) {
            left = left.next;
            right = right.next;
        }

        left.next = left.next.next;
        return dummy.next;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(N)$
  * **Space complexity**: $O(1)$