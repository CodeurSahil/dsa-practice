/**
 * // Definition for a _Node.
 * function _Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {_Node} head
 * @return {_Node}
 */
var copyRandomList = function(head) {
    let nodeArr = [];
    let newArr = [];

    let curNode = head;
    let copiedNode = null;
    let prevNode = null;

    while (curNode != null) {
        const newNode = new _Node(curNode.val, null, null);
        
        if (!copiedNode) copiedNode = newNode;

        if (prevNode) prevNode.next = newNode;
        prevNode = newNode;

        nodeArr.push(curNode);
        newArr.push(newNode);

        curNode = curNode.next;
    }

    for (let i = 0; i < nodeArr.length; i++) {
        const oldNode = nodeArr[i];
        const newNode = newArr[i];

        const indexOfRandomNode = nodeArr.indexOf(oldNode.random);

        newNode.random = indexOfRandomNode === -1 ? null : newArr[indexOfRandomNode] ;
    }

    return copiedNode;
};