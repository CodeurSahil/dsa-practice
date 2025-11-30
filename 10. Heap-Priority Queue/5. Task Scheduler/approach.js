class ModifiedPriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueueAlreadyDoneTask(TASK, priority) {
        console.log('💯 ~ test.js:6 -> TASK, priority: ', TASK, priority);
        while (this.queue[priority]) {
            console.log('🍔 ~ test.js:7 -> this.queue[priority]: ', this.queue[priority]);
            priority++;
        }
        
        console.log('🚁 ~ test.js:7 -> priority: ', priority);

        this.queue[priority] = TASK;

        return priority;
    }

    enqueueOnLatestAvailableSlot(TASK) {
        let priority = 0;

        while (this.queue[priority]) priority++;

        this.queue[priority] = TASK;

        return priority;
    }

    size() {
        return this.queue.length;
    } 
}

/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function(tasks, n) {
    const validationMap = new Map();
    const helperQueue = new ModifiedPriorityQueue();

    for (let i = 0; i < tasks.length; i++) {
        const TASK = tasks[i];

        if (!validationMap.has(TASK)) {
            validationMap.set(TASK, helperQueue.enqueueOnLatestAvailableSlot(TASK));
        }
        else {
            console.log('TASK', TASK, validationMap.get(TASK))

            validationMap.set(
                TASK, helperQueue.enqueueAlreadyDoneTask(TASK, validationMap.get(TASK) + n + 1)
            );
        }

        console.log(helperQueue.queue)

    }

    return helperQueue.size();
};

console.log(leastInterval(["A","A","A", "B","B","B"], 3))