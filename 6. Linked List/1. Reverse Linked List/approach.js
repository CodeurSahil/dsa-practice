/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    const helperStack = [];
    let current = head;

    while (current != null) {
        helperStack.push(current.val);
        current = current.next;
    }

    let reversedList = null;
    let lastNode = null;

    while (helperStack.length) {
        let node = new ListNode(helperStack.pop());

        if (lastNode) lastNode.next = node;
        if (!reversedList) reversedList = node;

        lastNode = node;
    }

    return reversedList;
};