/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
    const validStrings = [];

    const dfs = (i, path) => {
        if (i >= s.length) {
            validStrings.push([...path]);
            return;
        }

        for (let j = i; j < s.length; j++) {
            if (isPalindrome(s, i, j)) {
                path.push(s.slice(i, j + 1));
                dfs(j + 1, path);
                path.pop()
            }
        }
    }

    dfs(0, []);

    return validStrings;
};

const isPalindrome = (str, i, j) => {
    let left = i,
        right = j;

    while (left < right) {
        if (str[left] != str[right]) return false;

        left++;
        right--;
    }

    return true;
}