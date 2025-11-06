# 6. Lowest Common Ancestor of two nodes in BST

Given a Binary Tree and the value of two nodes belonging to it. Return the Lowest Common Ancestor of the two nodes. The Lowest Common Ancestor of two nodes is a shared ancestor of the two nodes that are the farthest from the root.

### Optimal
```
var lowestCommonAncestor = function(root, p, q) {
    let curr = root;
    while(curr) {
        if(curr.val === p.val || curr.val === q.val) return curr;

        if(p.val > curr.val && q.val > curr.val) {
            curr = curr.right;
        } else if(p.val < curr.val && q.val < curr.val) {
            curr = curr.left;
        } else {
            return curr;
        }
    }
};```