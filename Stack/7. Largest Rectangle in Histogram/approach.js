// Wont be Able to Complete Learn't n Done

/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
    const totalLen = heights.length;
    let maxArea = 0;
    const stack = [];

    for(let i = 0; i <= totalLen; i++) {

        while(stack.length && (heights[i] < heights[stack[stack.length - 1]] || i == totalLen)) {
            const height = heights[stack.pop()];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;

            maxArea = Math.max(maxArea, height * width)
        }

        stack.push(i);
    }

    return maxArea;
};