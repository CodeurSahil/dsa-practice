// /**
//  * @param {number[]} nums
//  * @return {boolean}
//  */


// var containsDuplicate = function(nums) {
//     for(let i = 0; i < nums.length; i++) {
//         const val = nums[i];

//         const lastIndex = nums.lastIndexOf(val);

//         if(lastIndex != i) {
//             return true;
//         }
//     }

//     return false;
// };


// // Failed Over Time

var containsDuplicate = function(nums) {
    const dataLength = nums.length;

    const set = new Set(nums); // .size to get length of Set

    let newArray = Array.from(set);

    return dataLength === newArray.length ? false : true;
};

console.log(containsDuplicate([1,2,3,1]));

// Accepted