function checkSum(arr, sum) {
    const checkMap = {0: 1};

    let curSum = 0, count = 0;

    for (let i = 0; i < arr.length; i++) {
        curSum += arr[i];
        
        const toFind = curSum - sum;

        count += (checkMap[toFind] || 0);

        checkMap[toFind] = (checkMap[toFind] || 0) + 1;
    }
    
    return count;
}

console.log(checkSum([1,-1,0], 0));

/**
 * Used Recursion to check the longest substring
 * Failed Over time
 */

var apply = function(arr, sum) {
    const arrGroup = [];
    for (let i = 0; i < arr.length; i++) {
        checkSum(arr, i, sum, arrGroup);
    }
    return arrGroup;
};

function checkSum(arr, startIndex, sum, arrGroup) {
    let res = 0
    for (let i = startIndex; i < arr.length; i++) {
        res += arr[i];
        if (res == sum) {
            arrGroup.push(arr.slice(startIndex, i+1));
        }
    }
    return null
}

console.log(apply([1,-1,0], 0));