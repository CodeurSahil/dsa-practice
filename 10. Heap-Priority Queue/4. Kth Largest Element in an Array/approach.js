class MyMaxPriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(num) {
        let length = this.queue.length;

        while (num > this.queue[length - 1]) {
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
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    // const heap = new MyMaxPriorityQueue();

    // for (const num of nums) {
    //     heap.enqueue(num);

    //     if (heap.size() > k) heap.queue.pop();
    // }

    // return heap.queue[k-1];
    const minHeap = new MinPriorityQueue();
        for (let num of nums) {
            minHeap.push(num);
            if (minHeap.size() > k) {
                minHeap.pop();
            }
        }
        return minHeap.front();
};