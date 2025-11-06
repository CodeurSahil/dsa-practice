![productfArrayExceptSelf](/asset/images/productfArrayExceptSelf.png)

### 1\. Brute Force

This is the most intuitive but least efficient method. It uses **nested loops**; for each element in the array, it iterates through the entire array again to calculate the product of all other elements. 🐢

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    productExceptSelf(nums) {
        const n = nums.length;
        const res = new Array(n);

        for (let i = 0; i < n; i++) {
            let prod = 1;
            for (let j = 0; j < n; j++) {
                if (i !== j) {
                    prod *= nums[j];
                }
            }
            res[i] = prod;
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n^2)$
  * **Space Complexity**: $O(1)$ extra space. The space for the output array is not counted.

-----

### 2\. Using Division

This approach is clever but often disallowed in interview settings for this specific problem. It first calculates the **total product** of all numbers in the array. Then, it iterates through the array again, and for each element, the result is the total product divided by the current element. This method requires special handling for zeros. ➗

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    productExceptSelf(nums) {
        let prod = 1;
        let zeroCount = 0;
        for (let num of nums) {
            if (num !== 0) {
                prod *= num;
            } else {
                zeroCount++;
            }
        }

        if (zeroCount > 1) {
            return Array(nums.length).fill(0);
        }

        const res = new Array(nums.length);
        for (let i = 0; i < nums.length; i++) {
            if (zeroCount > 0) {
                res[i] = nums[i] === 0 ? prod : 0;
            } else {
                res[i] = prod / nums[i];
            }
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(1)$ extra space. The space for the output array is not counted.

-----

### 3\. Prefix & Suffix Arrays

This is a common and efficient solution that doesn't use division. It involves two passes to create two auxiliary arrays: a **prefix array** (where `prefix[i]` is the product of all elements before `nums[i]`) and a **suffix array** (where `suffix[i]` is the product of all elements after `nums[i]`). The final result for each index `i` is simply `prefix[i] * suffix[i]`. ↔️

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    productExceptSelf(nums) {
        const n = nums.length;
        const res = new Array(n);
        const pref = new Array(n);
        const suff = new Array(n);

        pref[0] = 1;
        suff[n - 1] = 1;
        for (let i = 1; i < n; i++) {
            pref[i] = nums[i - 1] * pref[i - 1];
        }
        for (let i = n - 2; i >= 0; i--) {
            suff[i] = nums[i + 1] * suff[i + 1];
        }
        for (let i = 0; i < n; i++) {
            res[i] = pref[i] * suff[i];
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(n)$ for the prefix and suffix arrays.

-----

### 4\. Prefix & Suffix (Optimal Space)

This method optimizes the previous approach to use **constant extra space**. It uses the output array itself to store the prefix products in a first pass. Then, in a second pass (iterating backward), it calculates the suffix products on-the-fly using a single variable and multiplies them into the existing values in the output array. ✨

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    productExceptSelf(nums) {
        const n = nums.length;
        const res = new Array(n).fill(1);

        // Calculate prefix products and store in res
        for (let i = 1; i < n; i++) {
            res[i] = res[i - 1] * nums[i - 1];
        }

        // Calculate suffix products on-the-fly and multiply
        let postfix = 1;
        for (let i = n - 1; i >= 0; i--) {
            res[i] *= postfix;
            postfix *= nums[i];
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(1)$ extra space. The space for the output array is not counted.