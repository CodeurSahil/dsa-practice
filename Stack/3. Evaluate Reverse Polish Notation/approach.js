/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
    const stack = [];

    const operationList = ['+', '-', '*', '/'];

    for(let token of tokens) {
        if (!isNaN(Number(token))) {
            stack.push(Number(token));
        } else {
            const num1 = stack.pop();
            const num2 = stack.pop();

            let val;

            if(token == '+') {
                val = num2 + num1;
            } else if(token == '-') {
                val = num2 - num1;
            } else if(token == '*') {
                val = num2 * num1;
            } else if(token == '/') {
                let isNegative = false;

                if(num1 < 0) {
                    isNegative = !isNegative;
                }

                if(num2 < 0) {
                    isNegative = !isNegative;
                }

                val = Math.floor(Math.abs(num2) / Math.abs(num1));

                if(isNegative) {
                    val = -val;
                }
            }

            stack.push(val);
        }
    }

    return stack.pop();
};


// console.log(evalRPN(["2","1","+","3","*"]))
// console.log(evalRPN(["4","13","5","/","+"]))
console.log(evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"]))