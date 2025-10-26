![3 Sum](/asset/images/3sum1.png)
![3 Sum](/asset/images/3sum2.png)

### 1\. Brute Force

This is the most direct approach, using **three nested loops** to check every possible combination of three numbers in the array. To handle duplicate triplets, the array is first sorted, and a `Set` is used to store the unique results before converting them back to an array. 🐢

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    threeSum(nums) {
        const res = new Set();
        nums.sort((a, b) => a - b);
        for (let i = 0; i < nums.length; i++) {
            for (let j = i + 1; j < nums.length; j++) {
                for (let k = j + 1; k < nums.length; k++) {
                    if (nums[i] + nums[j] + nums[k] === 0) {
                        res.add(JSON.stringify([nums[i], nums[j], nums[k]]));
                    }
                }
            }
        }
        return Array.from(res).map((item) => JSON.parse(item));
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n^3)$ due to the triple nested loops.
  * **Space Complexity**: $O(m)$, where $m$ is the number of unique triplets found.

-----

### 2\. Hash Map

This method improves upon the brute force approach by using a **hash map for faster lookups**. After an initial sort, it iterates with a nested loop to fix two numbers (`nums[i]` and `nums[j]`) and then checks the hash map to see if the required third number (`target = -(nums[i] + nums[j])`) exists. 🗺️

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    threeSum(nums) {
        if (nums.length < 3) return [];
        nums.sort((a, b) => a - b);
        const res = [];
        
        for (let i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] === nums[i - 1]) continue; // Skip duplicates
            
            const seen = new Set();
            for (let j = i + 1; j < nums.length; j++) {
                const complement = -nums[i] - nums[j];
                if (seen.has(complement)) {
                    res.push([nums[i], nums[j], complement]);
                    // Skip duplicates for the second number
                    while (j + 1 < nums.length && nums[j] === nums[j + 1]) {
                        j++;
                    }
                }
                seen.add(nums[j]);
            }
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n^2)$
  * **Space Complexity**: $O(n)$ for the hash map/set.

-----

### 3\. Two Pointers (Optimal)

This is the most efficient and standard solution. First, the array is **sorted**. Then, the algorithm iterates through the array, fixing one number (`nums[i]`). For the remainder of the array to the right, it uses the **two-pointer technique** (one pointer `l` starting at `i+1`, one pointer `r` at the end) to find a pair that sums up to `-nums[i]`. The pointers move inwards based on whether their sum is too large or too small. ✅

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    threeSum(nums) {
        nums.sort((a, b) => a - b);
        const res = [];

        for (let i = 0; i < nums.length; i++) {
            // If the first number is positive, no sum can be zero
            if (nums[i] > 0) break;
            // Skip duplicate first numbers
            if (i > 0 && nums[i] === nums[i - 1]) continue;

            let l = i + 1;
            let r = nums.length - 1;
            while (l < r) {
                const sum = nums[i] + nums[l] + nums[r];
                if (sum > 0) {
                    r--;
                } else if (sum < 0) {
                    l++;
                } else {
                    res.push([nums[i], nums[l], nums[r]]);
                    l++;
                    r--;
                    // Skip duplicates for the second and third numbers
                    while (l < r && nums[l] === nums[l - 1]) {
                        l++;
                    }
                }
            }
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n^2)$. The initial sort is $O(n \\log n)$, and the nested loop with two pointers is $O(n^2)$.
  * **Space Complexity**: $O(1)$ or $O(n)$ for extra space, depending on the sorting algorithm used. This does not include the space required for the output list, which is $O(m)$.