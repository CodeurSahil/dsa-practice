![Design Twitter](/asset/images/DesignTwitter.png)
![Design Twitter](/asset/images/DesignTwitter2.png)

-----

### 1\. Sorting (Brute Force)

This straightforward approach gathers all tweets from a user and everyone they follow into a single list. It then sorts this combined list by timestamp to find the 10 most recent ones. While simple, sorting potentially large arrays on every feed request is inefficient. 🐢

```javascript
class Twitter {
    constructor() {
        this.time = 0;
        this.followMap = new Map(); // userId -> Set(followeeIds)
        this.tweetMap = new Map(); // userId -> Array([time, tweetId])
    }

    /**
     * @param {number} userId
     * @param {number} tweetId
     * @return {void}
     */
    postTweet(userId, tweetId) {
        if (!this.tweetMap.has(userId)) this.tweetMap.set(userId, []);
        this.tweetMap.get(userId).push([this.time++, tweetId]);
    }

    /**
     * @param {number} userId
     * @return {number[]}
     */
    getNewsFeed(userId) {
        let feed = [...(this.tweetMap.get(userId) || [])];
        (this.followMap.get(userId) || new Set()).forEach((followeeId) => {
            feed.push(...(this.tweetMap.get(followeeId) || []));
        });
        // Sort descending by time
        feed.sort((a, b) => b[0] - a[0]);
        return feed.slice(0, 10).map((x) => x[1]);
    }

    /**
     * @param {number} followerId
     * @param {number} followeeId
     * @return {void}
     */
    follow(followerId, followeeId) {
        if (followerId !== followeeId) {
            if (!this.followMap.has(followerId))
                this.followMap.set(followerId, new Set());
            this.followMap.get(followerId).add(followeeId);
        }
    }

    /**
     * @param {number} followerId
     * @param {number} followeeId
     * @return {void}
     */
    unfollow(followerId, followeeId) {
        if (this.followMap.has(followerId)) {
            this.followMap.get(followerId).delete(followeeId);
        }
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n \cdot m + t \log t)$ for `getNewsFeed()`, where $t$ is total tweets considered. $O(1)$ for others.
  * **Space complexity**: $O(N \cdot m + N \cdot M)$

-----

### 2\. Min-Heap (Merge K Sorted Lists)

This approach treats the problem like merging `k` sorted lists. Each user's tweets are already sorted by time. We use a **Min-Heap** (acting as a Max-Heap by using negative time or custom comparator) to efficiently pull the most recent tweets across all followed users without sorting everything. We push the latest tweet from each followee into the heap, then repeatedly extract the newest one and push the next newest from that same user. 📦

```javascript
/**
 * const { PriorityQueue } = require('@datastructures-js/priority-queue');
 */
class Twitter {
    constructor() {
        this.count = 0; // Acts as timestamp (decreasing for min-heap usage)
        this.tweetMap = new Map(); // userId -> array of [count, tweetId]
        this.followMap = new Map(); // userId -> set of followeeIds
    }

    /**
     * @param {number} userId
     * @param {number} tweetId
     * @return {void}
     */
    postTweet(userId, tweetId) {
        if (!this.tweetMap.has(userId)) {
            this.tweetMap.set(userId, []);
        }
        // Use decreasing count so smaller number = more recent
        this.tweetMap.get(userId).push([this.count--, tweetId]); 
    }

    /**
     * @param {number} userId
     * @return {number[]}
     */
    getNewsFeed(userId) {
        const res = [];
        if (!this.followMap.has(userId)) {
            this.followMap.set(userId, new Set());
        }
        this.followMap.get(userId).add(userId); // Add self to get own tweets
        
        // MinHeap stores [count, tweetId, followeeId, indexInTweetsArray]
        // Smaller count means more recent (since we decrement count)
        const minHeap = new PriorityQueue((a, b) => a[0] - b[0]);

        for (const followeeId of this.followMap.get(userId)) {
            if (this.tweetMap.has(followeeId)) {
                const tweets = this.tweetMap.get(followeeId);
                const index = tweets.length - 1;
                const [count, tweetId] = tweets[index];
                minHeap.enqueue([count, tweetId, followeeId, index - 1]);
            }
        }

        while (!minHeap.isEmpty() && res.length < 10) {
            const [count, tweetId, followeeId, nextIndex] = minHeap.dequeue();
            res.push(tweetId);
            
            // Push the next older tweet from the same user
            if (nextIndex >= 0) {
                const [olderCount, olderTweetId] = this.tweetMap.get(followeeId)[nextIndex];
                minHeap.enqueue([olderCount, olderTweetId, followeeId, nextIndex - 1]);
            }
        }

        return res;
    }

    /**
     * @param {number} followerId
     * @param {number} followeeId
     * @return {void}
     */
    follow(followerId, followeeId) {
        if (!this.followMap.has(followerId)) {
            this.followMap.set(followerId, new Set());
        }
        this.followMap.get(followerId).add(followeeId);
    }

    /**
     * @param {number} followerId
     * @param {number} followeeId
     * @return {void}
     */
    unfollow(followerId, followeeId) {
        if (this.followMap.has(followerId)) {
            this.followMap.get(followerId).delete(followeeId);
        }
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n \log n)$ for `getNewsFeed()`, where $n$ is the number of followees.
  * **Space complexity**: $O(N \cdot m + N \cdot M)$

-----

### 3\. Heap (Optimal with Optimization)

This is a refined version of the Heap approach. It includes an optimization in `postTweet`: we only keep the **10 most recent tweets** for any user stored in memory. Since `getNewsFeed` only needs 10 tweets, older ones are irrelevant. This bounds the heap size and processing time significantly. ✅

```javascript
/**
 * const { PriorityQueue } = require('@datastructures-js/priority-queue');
 */
class Twitter {
    constructor() {
        this.count = 0;
        this.tweetMap = new Map();
        this.followMap = new Map();
    }

    /**
     * @param {number} userId
     * @param {number} tweetId
     * @return {void}
     */
    postTweet(userId, tweetId) {
        if (!this.tweetMap.has(userId)) {
            this.tweetMap.set(userId, []);
        }
        const tweets = this.tweetMap.get(userId);
        tweets.push([this.count--, tweetId]);
        // Optimization: Only keep the 10 most recent tweets
        if (tweets.length > 10) {
            tweets.shift();
        }
    }

    /**
     * @param {number} userId
     * @return {number[]}
     */
    getNewsFeed(userId) {
        const res = [];
        if (!this.followMap.has(userId)) {
            this.followMap.set(userId, new Set());
        }
        this.followMap.get(userId).add(userId);
        
        const minHeap = new PriorityQueue((a, b) => a[0] - b[0]);

        // Optimization: If following many users, use a MaxHeap first to filter the top 10 recent tweets
        // from *all* followees' latest tweets, then put those into the MinHeap.
        // For simplicity in this snippet, the logic handles basic merging.
        
        for (const followeeId of this.followMap.get(userId)) {
            if (!this.tweetMap.has(followeeId)) continue;
            const tweets = this.tweetMap.get(followeeId);
            const idx = tweets.length - 1;
            const [cnt, tId] = tweets[idx];
            minHeap.enqueue([cnt, tId, followeeId, idx - 1]);
        }

        while (minHeap.size() > 0 && res.length < 10) {
            const [cnt, tId, fId, idx] = minHeap.dequeue();
            res.push(tId);
            if (idx >= 0) {
                const [olderCount, olderTId] = this.tweetMap.get(fId)[idx];
                minHeap.enqueue([olderCount, olderTId, fId, idx - 1]);
            }
        }
        return res;
    }

    /**
     * @param {number} followerId
     * @param {number} followeeId
     * @return {void}
     */
    follow(followerId, followeeId) {
        if (!this.followMap.has(followerId)) {
            this.followMap.set(followerId, new Set());
        }
        this.followMap.get(followerId).add(followeeId);
    }

    /**
     * @param {number} followerId
     * @param {number} followeeId
     * @return {void}
     */
    unfollow(followerId, followeeId) {
        if (this.followMap.has(followerId)) {
            this.followMap.get(followerId).delete(followeeId);
        }
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n)$ for `getNewsFeed()` because the number of tweets processed is bounded by a constant (10).
  * **Space complexity**: $O(N \cdot m + N \cdot M)$