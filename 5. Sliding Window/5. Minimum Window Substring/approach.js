/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    const t_count = {};
    
    for (let i = 0; i < t.length; i++) {
        t_count[t[i]] = (t_count[t[i]] || 0) + 1;
    }

    let have = 0, 
        need = Object.keys(t_count).length;

    let l = 0,
        res = [-1, -1],
        resLen = Infinity,
        s_count = {};

    for (let r = 0; r < s.length; r++) {
        const CHAR = s[r];
        
        s_count[CHAR] = (s_count[CHAR] || 0) + 1;

        if (s_count[CHAR] === t_count[CHAR]) have++;

        while (have === need) {
            if (r - l + 1 < resLen) {
                resLen = r - l + 1;
                res = [l, r];
            }

            const LEFT_CHAR = s[l];

            s_count[LEFT_CHAR]--;

            if (t_count[LEFT_CHAR] && s_count[LEFT_CHAR] < t_count[LEFT_CHAR]) {
                have--;
            }

            l++;
        }
    }

    return resLen == Infinity ? '' : s.slice(res[0], res[1] + 1);
};


/**
 * Only Some Test Cases Passed
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    const t_len = t.length;
    const t_map = {};
    
    for (let i = 0; i < t_len; i++) {
        t_map[t[i]] = (t_map[t[i]] || 0) + 1;
    }
    console.log('🚤 ~ test.js:8 -> t_map: ', t_map);

    let foundSubStr = '';
    let foundStrLen = 0;

    let l = 0, s_map = {}, lastFoundIndex = '';

    for (let i = 0; i < s.length; i++) {
        const CHAR = s[i];
        console.log('🚡 ~ test.js:21 -> CHAR: ', CHAR);

        
        if (t_map[CHAR]) {
            s_map[CHAR] = (s_map[CHAR] || 0) + 1;
            console.log('🚄 ~ test.js:24 -> s_map: ', s_map);

            if (foundStrLen === 0) l = i;
            if (foundStrLen === 1) lastFoundIndex = i;

            foundStrLen++;

            if (s_map[CHAR] > t_map[CHAR]) {
                foundStrLen = 1;

                s_map[CHAR]--;
                l = i;
            }

            console.log('🎻 ~ test.js:38 -> foundStrLen: ', foundStrLen);
            if (foundStrLen === t_len) {
                const newSubStr = s.substring(l, i + 1)
                console.log('🌟 ~ test.js:40 -> newSubStr: ', newSubStr);
                foundSubStr = foundSubStr == '' ? newSubStr : newSubStr.length < foundSubStr.length ? newSubStr : foundSubStr;

                s_map = {};
                foundStrLen = 0;
                i = lastFoundIndex == '' ? i : lastFoundIndex - 1;
            }
        }
    }

    return foundSubStr;
};