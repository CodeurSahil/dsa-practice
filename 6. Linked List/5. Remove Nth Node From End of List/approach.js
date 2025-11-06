/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    const helperArr = [];

    let curNode = head;

    while (curNode != null) {
        helperArr.push(curNode);
        curNode = curNode.next;
    }

    const deletionIndex = helperArr.length - n;

    if (deletionIndex === 0) {
        head = head.next;
    } else {
        let prevNode = helperArr[deletionIndex - 1];
        let newNode = helperArr[deletionIndex + 1] || null;

        prevNode.next = newNode;
    }

    return head;
};