
var MedianFinder = function() {
    this.largeValueHeap = new MinPriorityQueue()
    this.smallValueHeap = new MaxPriorityQueue()
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
    this.smallValueHeap.push(num);

    if (
        this.smallValueHeap.size() && 
        this.largeValueHeap.size() && 
        (
            this.smallValueHeap.front() > this.largeValueHeap.front()
            )
    ) {
        const value = this.smallValueHeap.pop();
        this.largeValueHeap.push(value);
    }

    if (this.smallValueHeap.size() > this.largeValueHeap.size() + 1) {
        const value = this.smallValueHeap.pop();
        this.largeValueHeap.push(value);
    }

    if (this.largeValueHeap.size() > this.smallValueHeap.size() + 1) {
        const value = this.largeValueHeap.pop();
        this.smallValueHeap.push(value);
    }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
    if (this.smallValueHeap.size() > this.largeValueHeap.size()) {
        return this.smallValueHeap.front();
    }
    if (this.largeValueHeap.size() > this.smallValueHeap.size()) {
        return this.largeValueHeap.front();
    }

    return (this.smallValueHeap.front() + this.largeValueHeap.front()) / 2;
};

/** 
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */