# 3Sum - Problem Statement and Solution Approaches

> 📄 This file is ready to be saved as a Markdown (.md) file. Save it as `three-sum.md`.

---

## 🧩 Problem Statement

Given an integer array `nums`, return all the **triplets** `[nums[i], nums[j], nums[k]]` such that:

- `i != j`, `i != k`, and `j != k`
- `nums[i] + nums[j] + nums[k] == 0`

**Note:** The solution set must **not contain duplicate triplets**.

---

## 📌 Example

### Input
```
nums = [-1, 0, 1, 2, -1, -4]
```

### Output
```
[[-1, -1, 2], [-1, 0, 1]]
```

---

## 🔍 Approach 1: Brute Force

### ✅ Logic
- Try all combinations of 3 numbers.
- Check if their sum is 0.
- Use a set to avoid duplicates.

### ⏱ Time Complexity
- **O(n³)** — three nested loops.

### 💾 Space Complexity
- **O(n)** — to store unique triplets.

### 🚫 Not recommended for large inputs.

---

## 🚀 Approach 2: Two Pointers (Optimal)

### ✅ Logic
- Sort the array.
- Fix one number, use two pointers to find the other two.
- Skip duplicates for all three pointers.

### ⏱ Time Complexity
- **O(n²)** — one loop + two pointer scan.

### 💾 Space Complexity
- **O(1)** — ignoring output space.

### 💻 Code
```javascript
var threeSum = function(nums) {
    nums.sort((a, b) => a - b);
    const res = [];

    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                res.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }

    return res;
};

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
```

---

## 🧠 Edge Cases
- Array length < 3 → return empty array.
- All elements positive → no triplet possible.
- All elements zero → return `[0, 0, 0]` once.

---

## 📊 Summary Table

| Approach       | Time Complexity | Space Complexity | Best For                   |
|----------------|------------------|-------------------|-----------------------------|
| Brute Force    | O(n³)            | O(n)              | Understanding the basics    |
| Two Pointers   | O(n²)            | O(1)              | Most efficient              |

---

## ✅ Final Notes

- Always sort the array first when using two-pointers.
- Skip duplicates to ensure unique triplets.
- Practice variants like:
  - 3Sum Closest
  - 4Sum

---
