/**
 * Did'nt Fail but not Optimal
 */

var lowestCommonAncestor = function (root, p, q) {
    const getPPath = getNodePath(root, p);
    console.log(getPPath)
    const getQPath = getNodePath(root, q);
    console.log(getQPath)

    const pLen = getPPath.length;
    const qLen = getQPath.length;

    const lowestLen = pLen < qLen ? pLen : qLen;
    console.log(lowestLen);

    let commonNode = root;

    for (let i = 1; i < lowestLen; i++) {
        if(getPPath[i] === getQPath[i]) {
            commonNode = commonNode[getPPath[i]];
        } else {
            break;
        }
    }
    console.log(commonNode);
    return commonNode;
};

function getNodePath(root, node) {
    const pathArray = ['root'];

    let found = false;

    while (true) {
        if (root.val > node.val) {
            pathArray.push('left');
            root = root.left;
        } else if (root.val < node.val) {
            pathArray.push('right');
            root = root.right;
        } else if (root.val == node.val) {
            found = true;
            break;
        }
    }

    if (found) {
        return pathArray;
    }
    return [];
}