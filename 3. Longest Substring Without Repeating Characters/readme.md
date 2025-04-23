# Longest Substring Without Repeating Characters

## 🧩 Problem Statement

Given a string `s`, find the length of the **longest substring** without repeating characters.

---

## 📌 Example

### Input
```
s = "abcabcbb"
```

### Output
```
3
```

### Explanation
The answer is `"abc"`, with the length of `3`.

---

## 🔍 Approach 1: Brute Force (Check All Substrings)

### ✅ Logic
- Generate all substrings.
- For each substring, check if it has all unique characters.

### ⏱ Time Complexity
- **O(n³)** — generating all substrings and checking uniqueness.

### 💾 Space Complexity
- **O(n)** — for checking each substring.

### 🚫 Not recommended for large inputs.

---

## 🚀 Approach 2: Sliding Window (Optimal)

### ✅ Logic
- Use two pointers (`left` and `right`) to create a sliding window.
- Move `right` pointer and check for duplicates using a hash map.
- If duplicate found, move `left` to one past the last occurrence.
- Track the max length as we go.

### ⏱ Time Complexity
- **O(n)** — each character is visited at most twice.

### 💾 Space Complexity
- **O(n)** — for storing characters in the map.

### 💻 Code
```javascript
var lengthOfLongestSubstring = function(s) {
    let map = new Map();
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];

        if (map.has(char) && map.get(char) >= left) {
            left = map.get(char) + 1;
        }

        map.set(char, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};

console.log(lengthOfLongestSubstring("abcabcbb")); // Output: 3
```

---

## 🔁 Common Mistake: Recursive Approach (Inefficient)

### 🔧 Example Code
```javascript
var lengthOfLongestSubstring = function(s) {
    return checkMax(s, 0, 0);
};

function checkMax(string, currentIndex, maxCount) {
    let longestStringCount = 0;
    let identifierMap = {};

    for (let i = currentIndex; i < string.length; i++) {
        let char = string[i];
        if (identifierMap[char]) {
            return checkMax(string, i - 1, Math.max(longestStringCount, maxCount));
        }
        longestStringCount++;
        identifierMap[char] = true;
    }

    return Math.max(longestStringCount, maxCount);
}
```

### ❌ Problem
- Recursively reprocesses characters.
- May return incorrect results like `2` instead of `1` for `"bbbbb"`.

---

## 📊 Summary Table

| Approach           | Time Complexity | Space Complexity | Suitable For             |
|--------------------|------------------|-------------------|---------------------------|
| Brute Force        | O(n³)            | O(n)              | Educational purposes      |
| Sliding Window     | O(n)             | O(n)              | Optimal, recommended      |
| Recursive (Custom) | > O(n²)          | O(n)              | Not efficient or correct  |

---

## ✅ Final Notes

- Always favor the **sliding window** method for this problem.
- Remember to update `left` pointer only when a **duplicate character is inside** the window.
- Keep practicing with variations like:
  - Longest substring with at most 2 distinct characters.
  - Longest substring with replacement.

---
