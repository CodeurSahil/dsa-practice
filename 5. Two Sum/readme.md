# Two Sum - Problem Statement and Solution Approaches

## 🧩 Problem Statement
Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to the target.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.

### 📌 Example
```
Input: nums = [2, 7, 11, 15], target = 9  
Output: [0, 1]  
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
```

---

## 🔍 Approach 1: Brute Force

### ✅ Logic
- Try every possible pair of elements using nested loops.
- Check if the sum equals the target.

### ⏱ Time Complexity
- **O(n²)** — due to nested loops.

### 💾 Space Complexity
- **O(1)** — no extra space used.

### 💻 Code
```javascript
function twoSum(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
}
```

---

## 🚀 Approach 2: Hash Map (Optimal Solution)

### ✅ Logic
- Use a hash map to store numbers as you iterate.
- For each element, check if `target - nums[i]` exists in the map.

### ⏱ Time Complexity
- **O(n)** — single pass through array.

### 💾 Space Complexity
- **O(n)** — space for the hash map.

### 💻 Code
```javascript
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
}
```

---

## 🧮 Approach 3: Two Pointers (Only for Sorted Arrays)

### ✅ Logic
- Sort the array while keeping track of original indices.
- Use two pointers from both ends and move accordingly.

### ⏱ Time Complexity
- **O(n log n)** — due to sorting.
- **O(n)** — for two-pointer scan.

### 💾 Space Complexity
- **O(n)** — for storing index references.

### 💻 Code
```javascript
function twoSum(nums, target) {
    const numsWithIndices = nums.map((num, index) => [num, index]);
    numsWithIndices.sort((a, b) => a[0] - b[0]);

    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        const sum = numsWithIndices[left][0] + numsWithIndices[right][0];
        if (sum === target) {
            return [numsWithIndices[left][1], numsWithIndices[right][1]];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
}
```

---

## 📊 Summary Table

| Approach       | Time Complexity | Space Complexity | Best For                   |
|----------------|------------------|-------------------|-----------------------------|
| Brute Force    | O(n²)            | O(1)              | Small arrays / learning     |
| Hash Map       | O(n)             | O(n)              | Optimal for all cases       |
| Two Pointers   | O(n log n)       | O(n)              | When array is sorted        |

---

## ✅ Final Tips
- The hash map approach is the most efficient for unsorted arrays.
- The two-pointer technique only works when the array is sorted **or** if you’re allowed to sort it.
- Brute force is useful to understand the core problem logic before optimizing.
