// 1

/**
 * @param {number[]} temperatures
 * @return {number[]}
 */

var dailyTemperatures = function(temperatures) {
    const tempStack = [];
    const tempLength = temperatures.length;
    const answer = Array.from({length: tempLength}, () => 0);

    for (let i = 0; i < tempLength; i++) {
        const currentTemp = temperatures[i];
        let daysCount = 0;

        for (let j = i + 1; j < tempLength; j++) {
            daysCount++;

            if (currentTemp < temperatures[j]) {
                answer[i] = daysCount;
                break;
            }
        }

    }

    return answer;
};

// Failed on Time


// Solved After Understabding

/**
 * @param {number[]} temperatures
 * @return {number[]}
 */

var dailyTemperatures = function(temperatures) {
    const tempStack = [];
    const tempLength = temperatures.length;
    const answer = new Array(tempLength).fill(0);

    for (let i = 0; i < tempLength; i++) {
        const currentTemp = temperatures[i];

        while(tempStack.length > 0 && tempStack[tempStack.length - 1][0] < currentTemp) {
            const [temp, index] = tempStack.pop();
            answer[index] = i - index;
        }

        tempStack.push([currentTemp, i]);
    }

    return answer;
};