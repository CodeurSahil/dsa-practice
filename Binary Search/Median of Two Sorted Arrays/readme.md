![Median of Two Sorted Arrays](/asset/images/MedianofTwoSortedArrays.png)

-----

### 1\. Brute Force (Merge and Sort)

This is the simplest approach. It involves concatenating the two arrays into one, sorting the newly merged array, and then finding the middle element(s) to calculate the median. 🐢

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number}
     */
    findMedianSortedArrays(nums1, nums2) {
        const merged = nums1.concat(nums2);
        merged.sort((a, b) => a - b);

        const totalLen = merged.length;
        if (totalLen % 2 === 0) {
            return (merged[totalLen / 2 - 1] + merged[totalLen / 2]) / 2.0;
        } else {
            return merged[Math.floor(totalLen / 2)];
        }
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O((n+m)\log(n+m))$
  * **Space complexity**: $O(n+m)$

(Where $n$ is the length of `nums1` and $m$ is the length of `nums2`.)

-----

### 2\. Two Pointers (Merge)

This method avoids a full sort. It uses **two pointers** to iterate through both arrays as if merging them. It only needs to find the element(s) at the median position, keeping track of the current (`median1`) and previous (`median2`) elements encountered. This is much more efficient as it doesn't build the full merged array. ↔️

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number}
     */
    findMedianSortedArrays(nums1, nums2) {
        let len1 = nums1.length,
            len2 = nums2.length;
        let i = 0,
            j = 0;
        let median1 = 0,
            median2 = 0;

        for (
            let count = 0;
            count < Math.floor((len1 + len2) / 2) + 1;
            count++
        ) {
            median2 = median1;
            if (i < len1 && j < len2) {
                if (nums1[i] > nums2[j]) {
                    median1 = nums2[j];
                    j++;
                } else {
                    median1 = nums1[i];
                    i++;
                }
            } else if (i < len1) {
                median1 = nums1[i];
                i++;
            } else {
                median1 = nums2[j];
                j++;
            }
        }

        if ((len1 + len2) % 2 === 1) {
            return median1;
        } else {
            return (median1 + median2) / 2.0;
        }
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n+m)$
  * **Space complexity**: $O(1)$

(Where $n$ is the length of `nums1` and $m$ is the length of `nums2`.)

-----

### 3\. Binary Search (Find k-th Element)

This advanced recursive approach finds the median by finding the **k-th smallest element** in the combined arrays (where k is the median index). It uses a binary search-like strategy, discarding half of one array in each recursive step by comparing the middle elements. 🌳

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number}
     */
    findMedianSortedArrays(nums1, nums2) {
        const m = nums1.length;
        const n = nums2.length;
        const left = Math.floor((m + n + 1) / 2);
        const right = Math.floor((m + n + 2) / 2);

        return (
            (this.getKth(nums1, m, nums2, n, left) +
                this.getKth(nums1, m, nums2, n, right)) /
            2.0
        );
    }

    /**
     * @param {number[]} a
     * @param {number} m (length of a)
     * @param {number[]} b
     * @param {number} n (length of b)
     * @param {number} k
     * @param {number} aStart
     * @param {number} bStart
     * @return {number}
     */
    getKth(a, m, b, n, k, aStart = 0, bStart = 0) {
        if (m - aStart > n - bStart) { // Ensure m <= n
            return this.getKth(b, n, a, m, k, bStart, aStart);
        }
        if (m - aStart === 0) {
            return b[bStart + k - 1];
        }
        if (k === 1) {
            return Math.min(a[aStart], b[bStart]);
        }

        const i = Math.min(m - aStart, Math.floor(k / 2));
        const j = k - i; // Ensure i + j = k

        if (a[aStart + i - 1] > b[bStart + j - 1]) {
            return this.getKth(a, m, b, n, k - j, aStart, bStart + j);
        } else {
            return this.getKth(a, m, b, n, k - i, aStart + i, bStart);
        }
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(\log(m+n))$
  * **Space complexity**: $O(\log(m+n))$ for the recursion stack.

(Where $n$ is the length of `nums1` and $m$ is the length of `nums2`.)

-----

### 4\. Binary Search (Optimal Partitioning)

This is the most optimal solution. It performs a **binary search on the smaller array** to find the correct "partition" point. The goal is to divide both arrays into a left and right half, where all elements in the combined left halves are less than or equal to all elements in the combined right halves, and the halves are of equal size. This directly finds the median values. ✅

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number}
     */
    findMedianSortedArrays(nums1, nums2) {
        let A = nums1;
        let B = nums2;
        const total = A.length + B.length;
        const half = Math.floor((total + 1) / 2);

        if (B.length < A.length) {
            [A, B] = [B, A]; // Ensure A is the smaller array
        }

        let l = 0;
        let r = A.length;
        while (l <= r) {
            const i = Math.floor((l + r) / 2); // Partition index for A
            const j = half - i; // Partition index for B

            const Aleft = i > 0 ? A[i - 1] : -Infinity;
            const Aright = i < A.length ? A[i] : Infinity;
            const Bleft = j > 0 ? B[j - 1] : -Infinity;
            const Bright = j < B.length ? B[j] : Infinity;

            // Check if partitions are correct
            if (Aleft <= Bright && Bleft <= Aright) {
                if (total % 2 !== 0) {
                    return Math.max(Aleft, Bleft);
                }
                return (Math.max(Aleft, Bleft) + Math.min(Aright, Bright)) / 2;
            } else if (Aleft > Bright) {
                r = i - 1; // Move left in A
            } else {
                l = i + 1; // Move right in A
            }
        }
        return -1; // Should not be reached
    }
}
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(\log(\min(n, m)))$
  * **Space complexity**: $O(1)$

(Where $n$ is the length of `nums1` and $m$ is the length of `nums2`.)

-----

### Two Pointers (Direct Merge)

```javascript
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    const total = nums1.length + nums2.length;

  if (total === 0) {
    return 0;
  }

  if (total === 1) {
    return nums1[0] !== undefined ? nums1[0] : nums2[0];
  }

  const mean = total / 2;
  const isEven = mean % 1 === 0; // Check if total count is even
  const medianIndex = isEven ? mean : Math.floor(mean);
  let i1 = 0;
  let i2 = 0;
  let first = null;
  let second = null;

  while (i1 + i2 <= medianIndex) {
    let newVal = null;
    if (i1 === nums1.length) {
      newVal = nums2[i2];
      i2++;
    } else if (i2 === nums2.length) {
      newVal = nums1[i1];
      i1++;
    } else if (nums1[i1] < nums2[i2]) {
      newVal = nums1[i1];
      i1++;
    } else {
      newVal = nums2[i2];
      i2++;
    }
    second = first;
    first = newVal;
  }

  return isEven ? (first + second) / 2 : first;
};
```

#### **Time & Space Complexity**

  * **Time complexity**: $O(n+m)$
  * **Space complexity**: $O(1)$

(Where $n$ is the length of `nums1` and $m$ is the length of `nums2`.)