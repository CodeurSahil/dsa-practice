class MyMinPriorityQueue {
    constructor(k) {
        this.queue = [];
        this.k = k;
    }

    enqueue(num) {
        let length = this.queue.length;

        while (num < this.queue[length - 1]) {
            this.queue[length] = this.queue[length - 1];
            length--;
        }

        this.queue[length] = num;
    }

    dequeue() {
        return this.queue.shift();
    }

    size() {
        return this.queue.length;
    }

    front() {
        return this.queue[0];
    }
}

/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function (k, nums) {
    this.minHeap = new MyMinPriorityQueue(k);

    for (const num of nums) {
        this.minHeap.enqueue(num);
    }

    while (this.minHeap.size() > k) {
        this.minHeap.dequeue();
    }
};

/** 
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
    this.minHeap.enqueue(val);

    if (this.minHeap.size() > this.minHeap.k) {
        this.minHeap.dequeue();
    }

    return this.minHeap.front();
};

// 2 9 9 10

/** 
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */