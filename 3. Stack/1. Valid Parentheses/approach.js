/**
 * @param {string} s
 * @return {boolean}
 */

var isValid = function(s) {
    const validParenthesisMap = {
        '(': ')',
        '[': ']',
        '{': '}'
    }

    let stack = [];
    let top = -1;

    for(let bracket of s) {
        if(top == -1) {
            top++;
            stack[top] = bracket;
        } else {
            const topValue = stack[top];

            if(validParenthesisMap[topValue] === bracket) {
                stack.pop();
                top--;
            } else {
                top++;
                stack[top] = bracket;
            }   
        }
    }

    return stack.length === 0 ? true : false;
};