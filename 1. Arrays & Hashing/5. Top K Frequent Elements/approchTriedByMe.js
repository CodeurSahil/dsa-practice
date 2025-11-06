/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    let verficationMap = {};

    for(const num of nums) {
        if(!verficationMap[num]){
            verficationMap[num] = 0;
        }

        verficationMap[num]++;
    }

    let verficationMapEntries = Object.entries(verficationMap);
    verficationMapEntries.sort((a, b) => b[1] - a[1]);

    let newMap = new Map(verficationMapEntries.slice(0, k));

    const finalArray = [];
    let newArr = Array.from(newMap.keys());

    newArr.forEach((num) => {
        finalArray.push(Number(num));
    })

    return finalArray;
};


// Worked

/**
// var topKFrequent = function(nums, k) {
//     let fs = new Map();
//     for (let n of nums) {
//         let f = (fs.get(n) || 0) + 1;
//         fs.set(n, f);
//     }

//     let buckets = [];
//     for (let [n, f] of fs.entries()) {
//         buckets[f] = buckets[f] || [];
//         buckets[f].push(n);
//     }

//     let res = [];
//     for (let i = buckets.length-1; i >= 0; i--) {
//         if (res.length >= k) return res;

//         if (buckets[i] && buckets.length) {
//             res = res.concat(buckets[i]);
//         }
//     }

//     return res;
// };
*/