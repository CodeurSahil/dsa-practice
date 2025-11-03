/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    let newList = null;
    let lastNode = null;

    while (list1 != null || list2 != null) {
        const list1Data = list1 && list1.val != null ? list1.val : null;
        const list2Data = list2 && list2.val != null ? list2.val : null;

        // console.log('list1Data', list1Data, list2Data)

        let node;

        if (list1Data == null && list2Data != null) {
            node = new ListNode(list2Data);
            list2 = list2.next;
        } else if (list1Data != null && list2Data == null) {
            node = new ListNode(list1Data);
            list1 = list1.next;
        } else {
            if (list1Data <= list2Data) {
                node = new ListNode(list1Data);
                list1 = list1.next;
            } else {
                node = new ListNode(list2Data);
                list2 = list2.next;
            }
        }

        if (lastNode) lastNode.next = node;
        if (!newList) newList = node;

        lastNode = node;
    }

    return newList;
};