![Merge Triplets to Form Target Triplet](/asset/images/MergeTripletstoFormTargetTriplet.png)
![Merge Triplets to Form Target Triplet](/asset/images/MergeTripletstoFormTargetTriplet2.png)

---

### 1. Greedy (Set-based)

This approach filters out "bad" triplets first. A triplet is bad if *any* of its values are strictly greater than the corresponding `target` value, because merging only increases numbers—you can never reduce a number back down to the target.

For the remaining valid triplets, we check which indices match the target exactly. If we can find triplets that match `target[0]`, `target[1]`, and `target[2]` respectively (while respecting the limit), we can merge them to form the target.

```javascript
class Solution {
    /**
     * @param {number[][]} triplets
     * @param {number[]} target
     * @return {boolean}
     */
    mergeTriplets(triplets, target) {
        const good = new Set();

        for (const t of triplets) {
            // Ignore triplets that exceed the target at any position
            if (t[0] > target[0] || t[1] > target[1] || t[2] > target[2]) {
                continue;
            }
            // For valid triplets, record which positions match the target
            for (let i = 0; i < t.length; i++) {
                if (t[i] === target[i]) {
                    good.add(i);
                }
            }
        }
        // If we found valid matches for indices 0, 1, and 2, return true
        return good.size === 3;
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**:  where  is the number of triplets.
* **Space Complexity**:  (The set size is at most 3).

---

### 2. Greedy (Optimal Boolean Flags)

This is the same logic but implemented slightly more efficiently using boolean flags. Instead of a set, we use three variables `x`, `y`, and `z`.

* `x` becomes true if we find a triplet that matches `target[0]` AND doesn't violate limits on other indices.
* Same for `y` (for `target[1]`) and `z` (for `target[2]`).

We can return `true` immediately once all three flags are set.

```javascript
class Solution {
    /**
     * @param {number[][]} triplets
     * @param {number[]} target
     * @return {boolean}
     */
    mergeTriplets(triplets, target) {
        let x = false,
            y = false,
            z = false;
            
        for (let t of triplets) {
            // Check if this triplet can satisfy target[0]
            // It must match target[0] exactly AND strictly not exceed others
            x |= t[0] === target[0] && t[1] <= target[1] && t[2] <= target[2];
            
            // Check for target[1]
            y |= t[0] <= target[0] && t[1] === target[1] && t[2] <= target[2];
            
            // Check for target[2]
            z |= t[0] <= target[0] && t[1] <= target[1] && t[2] === target[2];
            
            // Optimization: Return early if all conditions are met
            if (x && y && z) return true;
        }
        return false;
    }
}

```

#### **Time & Space Complexity**

* **Time Complexity**: 
* **Space Complexity**: