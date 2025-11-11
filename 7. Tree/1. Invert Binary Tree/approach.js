/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
    if (k <= 1) return head;

    let reversedList = null;
    let dummy = new ListNode(0);

    let currNode = head;
    let prevNode = head;

    let sizeCounter = 0;

    while (currNode != null) {
        let rightNode = currNode;

        sizeCounter++;
        currNode = currNode.next;
        console.log('sizeCounter', sizeCounter)

        if (sizeCounter % k === 0) {
            let lastNodeReference = prevNode;

            dummy.next = reverse(prevNode, rightNode);

            if (!reversedList) reversedList = dummy.next;

            dummy = prevNode;
            prevNode = prevNode.next;
        }
    }

    return reversedList;
};

const reverse = (prevNode, curNode) => {
    let helperNode = prevNode.next;

    prevNode.next = curNode.next;

    while (helperNode != curNode) {
        const helperNext = helperNode && helperNode.next ? helperNode.next : null;

        helperNode.next = prevNode;
        prevNode = helperNode;

        helperNode = helperNext;
    }

    helperNode.next = prevNode;
    prevNode = helperNode;

    return prevNode;
}