/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let maxArea = 0;

    let startIndex = 0;
    let endIndex = height.length - 1;

    while(startIndex < endIndex) {
        const valueOne = height[startIndex];
        const valueTwo = height[endIndex];

        if(valueOne < valueTwo) {
            const area = valueOne * (endIndex - startIndex)
            maxArea = maxArea < area ? area : maxArea;

            startIndex++;
        } else {
            const area = valueTwo * (endIndex - startIndex)
            maxArea = maxArea < area ? area : maxArea;

            endIndex--;
        }
    }

    return maxArea;
};