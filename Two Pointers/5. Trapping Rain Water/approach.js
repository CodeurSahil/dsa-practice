/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    const totalBar = height.length;

    let trappedWater = 0;

    let startPointer = 0;
    let endPointer = startPointer + 1;

    while(startPointer < totalBar) {
        const heightOne = height[startPointer];
        const heightTwo = height[endPointer];

        if(endPointer === totalBar) {
            startPointer++;
            endPointer = startPointer + 1;
            continue;
        }

        if(heightOne === 0) {
            startPointer++;
            endPointer++;

        } else if(heightOne > heightTwo) {

            endPointer++;

        } else {
            trappedWater += heightOne * (endPointer - (startPointer + 1));

            // Emptying Blocks
            for(let i = endPointer - 1; i > startPointer; i--) {
                const barH = height[i];
                trappedWater -= barH;
            }

            startPointer = endPointer;
            endPointer = startPointer + 1;
        }


    }

    return trappedWater;
};