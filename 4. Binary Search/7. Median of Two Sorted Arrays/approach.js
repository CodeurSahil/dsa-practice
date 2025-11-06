/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    const TOTAL = nums1.length + nums2.length;
    const HALF = Math.floor((TOTAL + 1) / 2);

    if (nums2.length < nums1.length) {
        // Swap
        [nums1 , nums2] = [nums2 , nums1];
    }
    // Now I Know that the nums1 will always be smaller

    let l = 0, r = nums1.length;
    console.log('nums1.length', nums1.length, nums2.length, TOTAL, HALF)

    while (l <= r) {
        const MID_OF_1 = Math.floor((l + r) / 2);
        const MID_OF_2 = HALF - MID_OF_1;

        console.log('MID_OF_1', MID_OF_1, MID_OF_2)

        let A_LEFT = MID_OF_1 > 0 ? nums1[MID_OF_1 - 1] : Number.MIN_SAFE_INTEGER;
        let A_RIGHT = MID_OF_1 < nums1.length ? nums1[MID_OF_1] : Number.MAX_SAFE_INTEGER;
        let B_LEFT = MID_OF_2 > 0 ? nums2[MID_OF_2 - 1] : Number.MIN_SAFE_INTEGER;
        let B_RIGHT = MID_OF_2 < nums2.length ? nums2[MID_OF_2] : Number.MAX_SAFE_INTEGER;
        
        console.log('A_LEFT', A_LEFT, A_RIGHT, B_LEFT, B_RIGHT);

        if (A_LEFT <= B_RIGHT && B_LEFT <= A_RIGHT) {
            // I got the Center
            if (TOTAL % 2 != 0) {
                return Math.max(A_LEFT , B_LEFT);
            }
            return (Math.max(A_LEFT , B_LEFT) + Math.min(A_RIGHT , B_RIGHT)) / 2
        } else if (A_LEFT > B_RIGHT) {
            r = MID_OF_1 - 1;
        } else {
            l = MID_OF_1 + 1;
        }
    }
};

/**
Given Two sorted Arrays
'nums1' with 'm' Size & 'nums2' with 'n' Size

Return Median of Sorted Array

nums1 = [1,3]
nums2 = [2]

total = [1,2,3]

total[1] = 2
 */



/**
 * 
 * Didnt Worked For All
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    const NUM1LEN = nums1.length;
    const NUM2LEN = nums2.length;

    let mid = Math.floor((NUM1LEN - 1) / 2);
    console.log('mid', mid)
    let median1 = 0;

    if (NUM1LEN === 0) {
        median1 = -1;
    } else if (mid % 2 === 0 && NUM1LEN > 1) {
        median1 = (nums1[mid] + nums1[mid + 1]) / 2;
    } else {
        median1 = nums1[mid];
    }

    mid = Math.floor((NUM2LEN - 1) / 2);
    console.log('mid', mid)
    let median2 = 0;

    if (NUM2LEN === 0) {
        median2 = -1;
    } else if (mid % 2 === 0 && NUM2LEN > 1) {
        median2 = (nums2[mid] + nums2[mid + 1]) / 2;
    } else {
        median2 = nums2[mid];
    }

    if (median1 == -1) {
        return median2;
    } else if (median2 == -1) {
        return median1;
    } else {
        return (median1 + median2) / 2;
    }

    // let l = 0, r = NUM1LEN - 1;

    // let median1 = 0;

    // while (l < r) {
    //     const MID = l + Math.floor((r - l) / 2);

    //     if (NUM1LEN[MID] < ) {

    //     }
    // }

    // let l = 0, r = NUM1LEN - 1;
};

/**
Given Two sorted Arrays
'nums1' with 'm' Size & 'nums2' with 'n' Size

Return Median of Sorted Array

nums1 = [1,3]
nums2 = [2]

total = [1,2,3]

total[1] = 2
 */