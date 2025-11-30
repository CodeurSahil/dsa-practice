
var Twitter = function() {
    this.followMap = new Map();
    this.arr = [];
    this.timeFrame = 0;
};

/** 
 * @param {number} userId 
 * @param {number} tweetId
 * @return {void}
 */
Twitter.prototype.postTweet = function(userId, tweetId) {
    this.arr[this.timeFrame] = [userId, tweetId, this.timeFrame];
    this.timeFrame++;
};

/** 
 * @param {number} userId
 * @return {number[]}
 */
Twitter.prototype.getNewsFeed = function(userId) {
    let len = 0;
    const newsFeed = [];

    for (let i = this.timeFrame - 1; i >= 0; i--) {
        const FEED = this.arr[i];

        if (FEED[0] === userId || (this.followMap.has(userId) && this.followMap.get(userId).get(FEED[0]))) {
            newsFeed.push(FEED[1]);
            len++;
        }

        if (len === 10) break;
    }

    return newsFeed;
};

/** 
 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.follow = function(followerId, followeeId) {
    if (!this.followMap.has(followerId)) {
        this.followMap.set(followerId, new Map());
    }

    this.followMap.get(followerId).set(followeeId, true);
};

/** 
 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.unfollow = function(followerId, followeeId) {
    if (this.followMap.has(followerId)) {
        this.followMap.get(followerId).set(followeeId, false);
    } 
};
// Tweet
// 1 - [5(0), 3(1), 101(2)]

// Follow
/** 
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */