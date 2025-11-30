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
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function(stones) {
    const heap = new MyMaxPriorityQueue()

    for (const stone of stones) {
        heap.enqueue(stone);
    }

    while (heap.size() > 1) {
        const stone1 = heap.dequeue();
        const stone2 = heap.dequeue();

        heap.enqueue(Math.abs(stone1 - stone2));
    }

    return heap.front();
};