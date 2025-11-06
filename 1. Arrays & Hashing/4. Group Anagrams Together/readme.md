# Group Anagrams Together - Problem Statement and Solution Approaches

---

## 🧩 Problem Statement

Given an array of strings `strs`, group the anagrams together. You can return the answer in **any order**.

Two strings are anagrams if they contain the same characters with the same frequencies.

---

## 📌 Example

### Input
```js
strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
```

### Output
```js
[
  ["eat", "tea", "ate"],
  ["tan", "nat"],
  ["bat"]
]
```

---

## 🔍 Approach 1: Sorting + HashMap

### ✅ Logic
- Sort each string and use the sorted version as a key in a hashmap.
- Group original strings by these sorted keys.

### ⏱ Time Complexity
- **O(n * k log k)** — where `n` is the number of strings, and `k` is the maximum length of a string.

### 💾 Space Complexity
- **O(nk)** — for storing grouped anagrams.

### 💻 Code
```javascript
var groupAnagrams = function(strs) {
    const map = new Map();

    for (let word of strs) {
        const sorted = word.split('').sort().join('');
        if (!map.has(sorted)) {
            map.set(sorted, []);
        }
        map.get(sorted).push(word);
    }

    return Array.from(map.values());
};
```

---

## 💡 Approach 2: Character Count Encoding

### ✅ Logic
- Instead of sorting, count the frequency of each letter.
- Use the frequency count (as a string key) in the hashmap.

### Example Encoding:
- `"eat"` → `[1, 0, 0, ..., 1, ..., 1]` → `"1#0#0#...#1#...#1"`

### ⏱ Time Complexity
- **O(n * k)** — better for long strings compared to sorting.

### 💾 Space Complexity
- **O(nk)**

### 💻 Code
```javascript
var groupAnagrams = function(strs) {
    const map = new Map();

    for (let str of strs) {
        const count = new Array(26).fill(0);
        for (let char of str) {
            count[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }
        const key = count.join('#');

        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(str);
    }

    return Array.from(map.values());
};
```

---

## 🧠 Edge Cases

- Empty input: return an empty array.
- Strings with different lengths and characters.
- Strings with same characters but different order.

---

## 📊 Summary Table

| Approach               | Time Complexity | Space Complexity | Suitable For           |
|------------------------|------------------|-------------------|-------------------------|
| Sorting + HashMap      | O(n * k log k)   | O(nk)             | Short strings           |
| Count Array Encoding   | O(n * k)         | O(nk)             | Longer strings, faster  |

---

## ✅ Final Notes

- Sorting works well and is easy to implement.
- Counting characters is more optimal for long strings.
- Hash maps are essential for grouping anagrams efficiently.

---

## 📚 Follow-up Practice

- Return indices of grouped anagrams instead of strings.
- Count the number of anagram groups.
- Optimize for streaming data.

---
