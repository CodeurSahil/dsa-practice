/**
 * @param {number[][]} ranges
 * @return {number}
 */
var countWays = function(ranges) {
    const mod = 1_000_000_007; // Prevent Overflow - Big Int
    ranges = ranges.sort((a, b) => a[0] - b[0]);

    let component = 0;
    let currentEnd = -1;

    for (const [start, end] of ranges) {
        if (start > currentEnd) {
            component++;
            currentEnd = end;
        } else {
            currentEnd = Math.max(currentEnd, end);
        }
    }

    let res = 1;
    for (let i = 0; i < component; i++) {
        console.log('res', res)
        res = (res * 2) % mod;
    }

    console.log('res', res)
    return res;
};