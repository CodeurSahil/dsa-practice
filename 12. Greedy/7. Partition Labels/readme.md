![Partition Labels](/asset/images/PartitionLabels.png)
![Partition Labels](/asset/images/PartitionLabels2.png)

### 1. Two Pointers (Greedy)

**Intuition:**
The core idea is that if a character `c` appears in a partition, *all* occurrences of `c` must be inside that same partition.

1. First, we iterate through the string to find the **last index** of every character.
2. We scan the string again. We maintain an `end` pointer, which represents the furthest index we must reach to close the current partition.
3. As we encounter each character, we update `end = Math.max(end, last_occurrence_of_char)`.
4. When our current index `i` reaches `end`, it means we have processed all characters required for this partition. We close it, record the size, and start a new one.

```javascript
class Solution {
    /**
     * @param {string} S
     * @return {number[]}
     */
    partitionLabels(S) {
        // Step 1: Record the last index of every character
        let lastIndex = {};
        for (let i = 0; i < S.length; i++) {
            lastIndex[S[i]] = i;
        }

        let res = [];
        let size = 0;
        let end = 0;

        // Step 2: Iterate and find partition boundaries
        for (let i = 0; i < S.length; i++) {
            size++;
            // The partition must extend at least to the last occurrence of the current char
            end = Math.max(end, lastIndex[S[i]]);

            // If we reached the required end, close the partition
            if (i === end) {
                res.push(size);
                size = 0;
            }
        }
        return res;
    }
}

```

### Time & Space Complexity

* **Time complexity**:  because we iterate through the string of length  twice (once to map indices, once to partition).
* **Space complexity**:  (specifically  or  where  is the alphabet size) to store the `lastIndex` map.