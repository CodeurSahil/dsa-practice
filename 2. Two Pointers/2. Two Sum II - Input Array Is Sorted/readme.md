![Two Sum II - Input Array Is Sorted](/asset/images/twoSumIIInputArrayIsSorted1.png)
![Two Sum II - Input Array Is Sorted](/asset/images/twoSumIIInputArrayIsSorted2.png)


### 1\. Brute Force

This method uses **nested loops** to check every possible pair of numbers to see if they sum to the target. It's a simple solution but doesn't take advantage of the fact that the input array is sorted, making it inefficient. 🐢

```javascript
class Solution {
    /**
     * @param {number[]} numbers
     * @param {number} target
     * @return {number[]}
     */
    twoSum(numbers, target) {
        for (let i = 0; i < numbers.length; i++) {
            for (let j = i + 1; j < numbers.length; j++) {
                if (numbers[i] + numbers[j] === target) {
                    return [i + 1, j + 1];
                }
            }
        }
        return [];
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n^2)$
  * **Space Complexity**: $O(1)$

-----

### 2\. Binary Search

This approach leverages the sorted property of the array. It iterates through each element and then uses **binary search on the rest of the array** to efficiently find the required complement (`target - current_number`). 🔍

```javascript
class Solution {
    /**
     * @param {number[]} numbers
     * @param {number} target
     * @return {number[]}
     */
    twoSum(numbers, target) {
        for (let i = 0; i < numbers.length; i++) {
            const complement = target - numbers[i];
            let l = i + 1,
                r = numbers.length - 1;
                
            while (l <= r) {
                const mid = l + Math.floor((r - l) / 2);
                if (numbers[mid] === complement) {
                    return [i + 1, mid + 1];
                } else if (numbers[mid] < complement) {
                    l = mid + 1;
                } else {
                    r = mid - 1;
                }
            }
        }
        return [];
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n \\log n)$
  * **Space Complexity**: $O(1)$

-----

### 3\. Hash Map

This is a common solution for the general "Two Sum" problem. It uses a **hash map** to store numbers it has already seen and their indices. For each number, it checks if its complement exists in the map. Like the brute-force method, this doesn't utilize the sorted nature of the input. 🗺️

```javascript
class Solution {
    /**
     * @param {number[]} numbers
     * @param {number} target
     * @return {number[]}
     */
    twoSum(numbers, target) {
        const mp = new Map();
        for (let i = 0; i < numbers.length; i++) {
            const complement = target - numbers[i];
            if (mp.has(complement)) {
                return [mp.get(complement), i + 1];
            }
            mp.set(numbers[i], i + 1);
        }
        return [];
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(n)$

-----

### 4\. Two Pointers (Optimal)

This is the most efficient solution for this specific problem. It uses **two pointers**, one at the beginning (`l`) and one at the end (`r`) of the array. Because the array is sorted, we can move the pointers inwards based on their sum: if the sum is too large, we decrease `r`; if it's too small, we increase `l`. ✅

```javascript
class Solution {
    /**
     * @param {number[]} numbers
     * @param {number} target
     * @return {number[]}
     */
    twoSum(numbers, target) {
        let l = 0,
            r = numbers.length - 1;

        while (l < r) {
            const curSum = numbers[l] + numbers[r];

            if (curSum > target) {
                r--;
            } else if (curSum < target) {
                l++;
            } else {
                return [l + 1, r + 1];
            }
        }
        return [];
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n)$
  * **Space Complexity**: $O(1)$