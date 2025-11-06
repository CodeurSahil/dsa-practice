/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let newList = null;
    let prevNode = null;

    let carry = 0;

    while (l1 != null || l2 != null) {
        let val1 = l1 && l1.val ? l1.val : 0;
        let val2 = l2 && l2.val ? l2.val : 0;

        let sum = val1 + val2 + carry;

        carry = Math.floor(sum / 10);

        const newNode = new ListNode(sum >= 10 ? sum - 10 : sum);

        if (!newList) newList = newNode;

        if (prevNode) prevNode.next = newNode;

        prevNode = newNode;

        
        l1 = l1 && l1.next ? l1.next : null;
        l2 = l2 && l2.next ? l2.next : null;
    }

    if (carry > 0) {
        const newNode = new ListNode(carry);
        prevNode.next = newNode
    }

    return newList
};