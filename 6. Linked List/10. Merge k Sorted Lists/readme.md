![ Merge k Sorted Lists](/asset/images/MergekSortedLists.png)
![ Merge k Sorted Lists](/asset/images/MergekSortedLists2.png)

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

### 1\. Brute Force (Collect, Sort, Rebuild)

This method traverses all `k` lists, collects every node's value into a single array, sorts that array, and then builds a new sorted linked list from the array's values. 🗃️

```javascript
class Solution {
    /**
     * @param {ListNode[]} lists
     * @return {ListNode}
     */
    mergeKLists(lists) {
        let nodes = [];
        for (let lst of lists) {
            while (lst) {
                nodes.push(lst.val);
                lst = lst.next;
            }
        }
        nodes.sort((a, b) => a - b);

        let res = new ListNode(0);
        let cur = res;
        for (let node of nodes) {
            cur.next = new ListNode(node);
            cur = cur.next;
        }
        return res.next;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(N \log N)$
  * **Space complexity**: $O(N)$

(Where $N$ is the *total* number of nodes across all lists.)

-----

### 2\. Iteration (Find Minimum)

This approach iteratively builds the merged list. In each step, it scans the heads of all `k` lists to find the minimum node, appends it to the result, and advances that list's pointer. 🐢

```javascript
class Solution {
    /**
     * @param {ListNode[]} lists
     * @return {ListNode}
     */
    mergeKLists(lists) {
        let res = new ListNode(0);
        let cur = res;

        while (true) {
            let minNode = -1;
            // Find the list with the minimum current node
            for (let i = 0; i < lists.length; i++) {
                if (!lists[i]) continue;
                if (minNode === -1 || lists[minNode].val > lists[i].val) {
                    minNode = i;
                }
            }

            if (minNode === -1) break; // All lists are exhausted
            cur.next = lists[minNode];
            lists[minNode] = lists[minNode].next;
            cur = cur.next;
        }
        return res.next;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(N \cdot k)$
  * **Space complexity**: $O(1)$

(Where $k$ is the number of lists and $N$ is the total number of nodes.)

-----

### 3\. Merge Lists One By One

This method repeatedly merges two lists at a time. It merges `list[1]` into `list[0]`, then merges the result with `list[2]`, and so on, until all lists are merged into one.

```javascript
class Solution {
    /**
     * @param {ListNode[]} lists
     * @return {ListNode}
     */
    mergeKLists(lists) {
        if (lists.length === 0) return null;
        let mergedList = lists[0];

        for (let i = 1; i < lists.length; i++) {
            mergedList = this.mergeList(mergedList, lists[i]);
        }
        return mergedList;
    }

    /**
     * @param {ListNode} l1
     * @param  {ListNode} l2
     * @return {ListNode}
     */
    mergeList(l1, l2) {
        const dummy = new ListNode();
        let tail = dummy;

        while (l1 && l2) {
            if (l1.val < l2.val) {
                tail.next = l1;
                l1 = l1.next;
            } else {
                tail.next = l2;
                l2 = l2.next;
            }
            tail = tail.next;
        }
        if (l1) {
            tail.next = l1;
        }
        if (l2) {
            tail.next = l2;
        }
        return dummy.next;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(N \cdot k)$
  * **Space complexity**: $O(1)$

(Where $k$ is the number of lists and $N$ is the total number of nodes.)

-----

### 4\. Min Heap (Priority Queue)

This is a highly efficient method. It uses a **Min Priority Queue** to store the head node of each of the `k` lists. It repeatedly extracts the minimum node from the heap, adds it to the result, and inserts the *next* node from that same list into the heap. 🔥

```javascript
class Solution {
    /**
     * @param {ListNode[]} lists
     * @return {ListNode}
     */
    mergeKLists(lists) {
        if (lists.length === 0) return null;
        // Assumes MinPriorityQueue is available
        const minHeap = new MinPriorityQueue({ priority: (x) => x.val });
        for (let list of lists) {
            if (list != null) minHeap.enqueue(list);
        }

        let res = new ListNode(0);
        let cur = res;
        while (minHeap.size() > 0) {
            let node = minHeap.dequeue().element;
            cur.next = node;
            cur = cur.next;

            node = node.next;
            if (node != null) {
                minHeap.enqueue(node);
            }
        }
        return res.next;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(N \log k)$
  * **Space complexity**: $O(k)$

(Where $k$ is the number of lists and $N$ is the total number of nodes.)

-----

### 5\. Divide And Conquer (Recursion)

This method recursively **splits the list of lists in half** until it's down to single lists. It then merges these lists back together as the recursion unwinds. This is analogous to how merge sort works. 🌳

```javascript
class Solution {
    /**
     * @param {ListNode[]} lists
     * @return {ListNode}
     */
    mergeKLists(lists) {
        if (!lists || lists.length === 0) {
            return null;
        }
        return this.divide(lists, 0, lists.length - 1);
    }

    /**
     * @param {ListNode[]} lists
     * @param {number} l
     * @param {number} r
     * @return {ListNode}
     */
    divide(lists, l, r) {
        if (l > r) {
            return null;
        }
        if (l === r) {
            return lists[l];
        }

        const mid = Math.floor(l + (r - l) / 2);
        const left = this.divide(lists, l, mid);
        const right = this.divide(lists, mid + 1, r);

        return this.conquer(left, right);
    }

    /**
     * @param {ListNode} l1
     * @param  {ListNode} l2
     * @return {ListNode}
     */
    conquer(l1, l2) {
        const dummy = new ListNode(0);
        let curr = dummy;

        while (l1 && l2) {
            if (l1.val <= l2.val) {
                curr.next = l1;
                l1 = l1.next;
            } else {
                curr.next = l2;
                l2 = l2.next;
            }
            curr = curr.next;
        }

        curr.next = l1 ? l1 : l2;
        return dummy.next;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(N \log k)$
  * **Space complexity**: $O(\log k)$ (for the recursion stack)

(Where $k$ is the number of lists and $N$ is the total number of nodes.)

-----

### 6\. Divide And Conquer (Iteration)

This is the iterative version of the divide and conquer approach. It repeatedly merges pairs of lists in rounds. In each round, it halves the number of lists until only one remains. ✅

```javascript
class Solution {
    /**
     * @param {ListNode[]} lists
     * @return {ListNode}
     */
    mergeKLists(lists) {
        if (!lists || lists.length === 0) {
            return null;
        }

        while (lists.length > 1) {
            const mergedLists = [];
            for (let i = 0; i < lists.length; i += 2) {
                const l1 = lists[i];
                const l2 = i + 1 < lists.length ? lists[i + 1] : null;
                mergedLists.push(this.mergeList(l1, l2));
            }
            lists = mergedLists;
        }
        return lists[0];
    }

    /**
     * @param {ListNode} l1
     * @param  {ListNode} l2
     * @return {ListNode}
     */
    mergeList(l1, l2) {
        const dummy = new ListNode(0);
        let curr = dummy;

        while (l1 && l2) {
            if (l1.val <= l2.val) {
                curr.next = l1;
                l1 = l1.next;
            } else {
                curr.next = l2;
                l2 = l2.next;
            }
            curr = curr.next;
        }

        curr.next = l1 ? l1 : l2;
        return dummy.next;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(N \log k)$
  * **Space complexity**: $O(k)$ (or $O(1)$ if modifying the list in-place)

(Where $k$ is the number of lists and $N$ is the total number of nodes.)