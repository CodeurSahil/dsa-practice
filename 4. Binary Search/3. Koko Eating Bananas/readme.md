![Find Minimum in Rotated Sorted Array](/asset/images/KokoEatingBananas.png)
![Find Minimum in Rotated Sorted Array](/asset/images/KokoEatingBananas2.png)

### 1\. Brute Force

This straightforward approach tests every possible eating speed, starting from `k=1`. It calculates the total time for each speed, and the *first* speed that allows Koko to finish within `h` hours is the minimum possible, so it's returned. 🐢

```javascript
class Solution {
    /**
     * @param {number[]} piles
     * @param {number} h
     * @return {number}
     */
    minEatingSpeed(piles, h) {
        let speed = 1;
        while (true) {
            let totalTime = 0;
            for (let pile of piles) {
                totalTime += Math.ceil(pile / speed);
            }

            if (totalTime <= h) {
                return speed;
            }
            speed++;
        }
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(m \cdot n)$
  * **Space Complexity**: $O(1)$

(Where $n$ is the length of `piles` and $m$ is the maximum number of bananas in a pile.)

-----

### 2\. Binary Search

This optimal solution notes that the range of possible speeds is between `1` (slowest) and `max(piles)` (fastest necessary). Since this range is sorted, we can use **binary search** to efficiently find the *minimum* speed `k` in this range that still allows Koko to finish all bananas within `h` hours. ✅

```javascript
class Solution {
    /**
     * @param {number[]} piles
     * @param {number} h
     * @return {number}
     */
    minEatingSpeed(piles, h) {
        let l = 1;
        let r = Math.max(...piles);
        let res = r;

        while (l <= r) {
            const k = Math.floor((l + r) / 2);

            let totalTime = 0;
            for (const p of piles) {
                totalTime += Math.ceil(p / k);
            }
            if (totalTime <= h) {
                res = k; // This speed k works, try a smaller one
                r = k - 1;
            } else {
                l = k + 1; // This speed k is too slow
            }
        }
        return res;
    }
}
```

#### **Time & Space Complexity**

  * **Time Complexity**: $O(n \cdot \log m)$
  * **Space Complexity**: $O(1)$

(Where $n$ is the length of `piles` and $m$ is the maximum number of bananas in a pile.)