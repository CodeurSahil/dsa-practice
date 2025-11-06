class DequeOrg {
    constructor() {
        this.Q = [];
    }

    size() {
        return this.Q.length;
    }

    getBack() {
        return this.Q[this.Q.length - 1];
    }

    getFront() {
        return this.Q[0];
    }

    enqueueBack(data) {
        this.Q.push(data);
    }

    enqueueFront(data) {
        this.Q.unshift(data);
    }

    dequeueBack() {
        return this.Q.pop();
    }

    dequeueFront() {
        return this.Q.shift();
    }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    const dataLen = nums.length;
    const res = new Array(dataLen - k + 1);
    const Q = new DequeOrg();
    let l = 0,
        r = 0;

    while (r < dataLen) {
        while (Q.size() && nums[Q.getBack()] < nums[r]) {
            Q.dequeueBack();
        }

        Q.enqueueBack(r);

        if (l > Q.getFront()) {
            Q.dequeueFront();
        }

        if (r - l + 1 >= k) {
            res[l] = nums[Q.getFront()];
            l++
        }

        r++;
    }

    return res;
};