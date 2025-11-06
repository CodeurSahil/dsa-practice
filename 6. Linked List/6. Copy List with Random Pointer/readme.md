![Copy List with Random Pointer](/asset/images/CopyListwithRandomPointer.png)
![Copy List with Random Pointer](/asset/images/CopyListwithRandomPointer2.png)
![Copy List with Random Pointer](/asset/images/CopyListwithRandomPointer3.png)

*The `Node` definition for these examples:*

```javascript
// class Node {
//   constructor(val, next = null, random = null) {
//       this.val = val;
//       this.next = next;
//       this.random = random;
//   }
// }
```

-----

### 1\. Recursion + Hash Map

This approach uses **recursion** to traverse the list. A `Map` is used to store nodes that have already been copied (memoization). This prevents infinite loops if the `random` pointers create cycles. 🌳

```javascript
class Solution {
    constructor() {
        this.map = new Map(); // oldNode -> newNode
    }
    /**
     * @param {Node} head
     * @return {Node}
     */
    copyRandomList(head) {
        if (head === null) return null;
        if (this.map.has(head)) return this.map.get(head);

        const copy = new Node(head.val);
        this.map.set(head, copy);
        copy.next = this.copyRandomList(head.next);
        copy.random = this.copyRandomList(head.random);
        return copy;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n)$

-----

### 2\. Hash Map (Two Pass)

This is a common iterative approach. The **first pass** iterates through the original list and creates a copy of each node, storing the mapping `oldNode -> newNode` in a `Map`. The **second pass** iterates through the original list again, using the map to set the `next` and `random` pointers for the copied nodes. 🗺️

```javascript
class Solution {
    /**
     * @param {Node} head
     * @return {Node}
     */
    copyRandomList(head) {
        const oldToCopy = new Map();
        oldToCopy.set(null, null);

        // 1st Pass: Create all new nodes
        let cur = head;
        while (cur) {
            const copy = new Node(cur.val);
            oldToCopy.set(cur, copy);
            cur = cur.next;
        }

        // 2nd Pass: Link next and random pointers
        cur = head;
        while (cur) {
            const copy = oldToCopy.get(cur);
            copy.next = oldToCopy.get(cur.next);
            copy.random = oldToCopy.get(cur.random);
            cur = cur.next;
        }

        return oldToCopy.get(head);
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n)$

-----

### 3\. Hash Map (One Pass)

This is a slightly more complex but efficient single-pass iterative solution. It creates new nodes "just in time" (`on-the-fly`) as it traverses the original list, using a map to ensure nodes are only created once.

```javascript
class Solution {
    /**
     * @param {Node} head
     * @return {Node}
     */
    copyRandomList(head) {
        const oldToCopy = new Map();
        oldToCopy.set(null, null);

        let cur = head;
        while (cur !== null) {
            // Get or create the copy of the current node
            if (!oldToCopy.has(cur)) {
                oldToCopy.set(cur, new Node(cur.val));
            }
            const copy = oldToCopy.get(cur);
            
            // Get or create the copy of the next node
            if (!oldToCopy.has(cur.next)) {
                oldToCopy.set(cur.next, new Node(0)); // Val will be set later
            }
            copy.next = oldToCopy.get(cur.next);

            // Get or create the copy of the random node
            if (!oldToCopy.has(cur.random)) {
                oldToCopy.set(cur.random, new Node(0)); // Val will be set later
            }
            copy.random = oldToCopy.get(cur.random);
            
            cur = cur.next;
        }
        return oldToCopy.get(head);
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(n)$

-----

### 4\. Space Optimized - I (Interleaving Nodes)

This optimal solution achieves $O(1)$ extra space by modifying the original list.

1.  **Interleave:** Create a copy of each node and place it directly after the original node (`L1 -> L1_copy -> L2 -> L2_copy ...`).
2.  **Set Random:** Iterate through the interleaved list. For each original node `l1`, its copy's random pointer is `l1.random.next` (which is the copy of the original random node).
3.  **Separate:** Separate the two lists back into the original and the new copy. ✅

<!-- end list -->

```javascript
class Solution {
    /**
     * @param {Node} head
     * @return {Node}
     */
    copyRandomList(head) {
        if (!head) return null;

        // 1. Interleave new nodes
        let l1 = head;
        while (l1) {
            const l2 = new Node(l1.val);
            l2.next = l1.next;
            l1.next = l2;
            l1 = l2.next;
        }

        const newHead = head.next;

        // 2. Set random pointers
        l1 = head;
        while (l1) {
            if (l1.random) {
                l1.next.random = l1.random.next;
            }
            l1 = l1.next.next;
        }

        // 3. Separate the lists
        l1 = head;
        while (l1) {
            const l2 = l1.next;
            l1.next = l2.next;
            if (l2.next) {
                l2.next = l2.next.next;
            }
            l1 = l1.next;
        }

        return newHead;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(1)$ extra space (the new list itself is $O(n)$).

-----

### 5\. Space Optimized - II (Using Random Pointer)

This is another $O(1)$ space solution that temporarily hijacks the `random` pointer of the original list to store the mapping to the new nodes, and the `next` pointer of the new nodes to store the mapping to the original random node. It's more complex and less intuitive than the interleaving method.

```javascript
class Solution {
    /**
     * @param {Node} head
     * @return {Node}
     */
    copyRandomList(head) {
        if (head === null) return null;

        // 1. Create copies.
        // l1.random points to l2 (copy). l2.next points to l1.random.
        let l1 = head;
        while (l1) {
            let l2 = new Node(l1.val);
            l2.next = l1.random;
            l1.random = l2;
            l1 = l1.next;
        }
        const newHead = head.random;

        // 2. Set random pointers for the new list.
        l1 = head;
        while (l1) {
            let l2 = l1.random;
            l2.random = l2.next ? l2.next.random : null;
            l1 = l1.next;
        }

        // 3. Restore l1's random and set l2's next.
        l1 = head;
        while (l1) {
            let l2 = l1.random;
            l1.random = l2.next;
            l2.next = l1.next ? l1.next.random : null;
            l1 = l1.next;
        }

        return newHead;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$
  * **Space complexity**: $O(1)$ extra space.