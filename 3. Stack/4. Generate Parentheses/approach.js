/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    let string = '';
    const combinations = [];

    let openBracesCount = 0;
    let closedBracesCount = 0;

    dfs(string, n * 2, openBracesCount, closedBracesCount, combinations, n);

    return combinations;
};

function dfs(str, curValue, openBracesCount, closedBracesCount, combinations, limit) {
    if(curValue === 0) {
        combinations.push(str);
        return;
    }

    const lastChar = str.length !== 0 ? str[str.length - 1] : null;
    const validOptions = ['(', ')'];

    if (lastChar === '(') {
        if(openBracesCount != limit) {
            dfs(str + '(', curValue - 1, openBracesCount + 1, closedBracesCount, combinations, limit);
        }

        if(openBracesCount > closedBracesCount) {
            dfs(str + ')', curValue - 1, openBracesCount, closedBracesCount + 1, combinations, limit);
        }
    } else if (lastChar === ')') {
        if(openBracesCount != limit) {
            dfs(str + '(', curValue - 1, openBracesCount + 1, closedBracesCount, combinations, limit);
        }

        if(openBracesCount > closedBracesCount) {
            dfs(str + ')', curValue - 1, openBracesCount, closedBracesCount + 1, combinations, limit);
        }
    } else {
        dfs('(', curValue - 1, openBracesCount + 1, closedBracesCount, combinations, limit);
    }

    return;
}

console.log(generateParenthesis(3));