![Merge Two Sorted Lists](/asset/images/MergeTwoSortedLists.png)
![Merge Two Sorted Lists](/asset/images/MergeTwoSortedLists2.png)

-----

### 1\. Recursion

This approach uses **recursion** to merge the lists. It compares the heads of both lists and sets the `next` pointer of the smaller node to the result of merging the rest of that list with the other list. 🌳

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
     * @param {ListNode} list1
     * @param {ListNode} list2
     * @return {ListNode}
     */
    mergeTwoLists(list1, list2) {
        if (!list1) {
            return list2;
        }
        if (!list2) {
            return list1;
        }
        if (list1.val <= list2.val) {
            list1.next = this.mergeTwoLists(list1.next, list2);
            return list1;
        } else {
            list2.next = this.mergeTwoLists(list1, list2.next);
            return list2;
        }
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n + m)$
  * **Space complexity**: $O(n + m)$ (due to the recursion call stack)

(Where $n$ is the length of `list1` and $m$ is the length of `list2`.)

-----

### 2\. Iteration

This is the optimal, space-efficient solution. It uses a **dummy node** as a starting point and a `node` pointer to build the new merged list. It iterates through both lists, appending the smaller node to the new list until one list is exhausted, at which point it appends the remainder of the other list. ✅

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
     * @param {ListNode} list1
     * @param {ListNode} list2
     * @return {ListNode}
     */
    mergeTwoLists(list1, list2) {
        const dummy = { val: 0, next: null };
        let node = dummy;

        while (list1 && list2) {
            if (list1.val < list2.val) {
                node.next = list1;
                list1 = list1.next;
            } else {
                node.next = list2;
                list2 = list2.next;
            }
            node = node.next;
        }

        if (list1) {
            node.next = list1;
        } else {
            node.next = list2;
        }

        return dummy.next;
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n + m)$
  * **Space complexity**: $O(1)$

(Where $n$ is the length of `list1` and $m$ is the length of `list2`.)