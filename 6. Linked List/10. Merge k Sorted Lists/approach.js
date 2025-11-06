/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    if (lists.length === 0) return null;

    let newList = lists[0];

    for (let i = 1; i < lists.length; i++) {
        let list = lists[i];

        if (!newList) {
            newList = list;
            continue;
        }

        let curNode = list;

        while (curNode != null) {
            list = list.next;
            curNode.next = null;

            if (newList.val >= curNode.val) {
                curNode.next = newList;
                newList = curNode;
            } else {
                insertNode(newList, curNode);
            }

            curNode = list;
        }

    }

    return newList;
};

const insertNode = (list, node) => {
    let curNode = list;
    let prevNode = null;

    while (curNode != null && curNode.val < node.val) {
        prevNode = curNode;
        curNode = curNode.next;
    }

    node.next = curNode;
    prevNode.next = node;

    return list;
}