/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
    if (s1.length > s2.length) return false;

    let s1Arr = new Array(26).fill(0);
    let s2Arr = new Array(26).fill(0);

    for (let i = 0; i < s1.length; i++) {
        s1Arr[s1.charCodeAt(i) - 97]++;
        s2Arr[s2.charCodeAt(i) - 97]++;
    }

    let matches = 0;
    for (let i = 0; i < 26; i++) {
        matches += s1Arr[i] === s2Arr[i] ? 1 : 0;
    }

    let l = 0;
    for (let i = s1.length; i < s2.length; i++) {
        if (matches === 26) return true;

        const CHAR_INDEX = s2.charCodeAt(i) - 97;
        
        s2Arr[CHAR_INDEX]++;

        if (s1Arr[CHAR_INDEX] === s2Arr[CHAR_INDEX]) {
            matches++;
        } else if (s1Arr[CHAR_INDEX] + 1 === s2Arr[CHAR_INDEX]) {
            matches--;
        }

        const CHAR_INDEX_L = s2.charCodeAt(l) - 97;
        
        s2Arr[CHAR_INDEX_L]--;

        if (s1Arr[CHAR_INDEX_L] === s2Arr[CHAR_INDEX_L]) {
            matches++;
        } else if (s1Arr[CHAR_INDEX_L] - 1 === s2Arr[CHAR_INDEX_L]) {
            matches--;
        }

        l++;
    }

    return matches == 26;
};

/**
 * Failed on Time
 */

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
    const S1_MAP = {};

    for (let i = 0; i < s1.length; i++) {
        S1_MAP[s1[i]] = (S1_MAP[s1[i]] || 0) + 1;
    }

    const totalKeysCount = Object.keys(S1_MAP).length;

    for (let i = 0; i < s2.length; i++) {
        const S2_MAP = {};
        let keysCount = 0;

        for (let j = i; j < s2.length; j++) {
            const CHECK_CHAR = s2[j];

            S2_MAP[CHECK_CHAR] = (S2_MAP[CHECK_CHAR] || 0) + 1;

            if ((S1_MAP[CHECK_CHAR] || 0) < S2_MAP[CHECK_CHAR]) break;

            if ((S1_MAP[CHECK_CHAR] || 0) === S2_MAP[CHECK_CHAR]) keysCount++;

            if (keysCount === totalKeysCount) return true;
        }
    }

    return false;
};