/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    
    while (head != null) {
        if (head.val == 'V') return true;

        head.val = 'V';
        head = head.next;
    }

    return false;
};