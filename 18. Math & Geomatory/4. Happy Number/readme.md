![Happy Number](/asset/images/HappyNumber.png)

---

## 1. Hash Set

### Intuition
While repeatedly replacing a number with the sum of the squares of its digits, only two things can happen:
* We eventually reach `1` $\rightarrow$ the number is happy.
* We fall into a cycle and repeat numbers forever $\rightarrow$ the number is not happy.

So the key problem is cycle detection. A simple and beginner-friendly way to detect a cycle is to keep a set of numbers we have already seen. If a number repeats, we are stuck in a loop and will never reach `1`.

### Algorithm
1. Initialize an empty set `visit` to store numbers we have already seen.
2. While `n` is not in `visit`:
   * Add `n` to `visit`.
   * Replace `n` with the sum of the squares of its digits (using a helper function).
   * If `n` becomes `1`, return `True`.
3. If we exit the loop, it means `n` repeated: a cycle is detected. Return `False`.

**Helper Function (Sum of Squares):**
* Initialize `output = 0`.
* While `n > 0`: extract the last digit (`n % 10`), square it, add to `output`, and remove the digit (`n // 10`).
* Return `output`.

```python
class Solution:
    def isHappy(self, n: int) -> bool:
        visit = set()

        while n not in visit:
            visit.add(n)
            n = self.sumOfSquares(n)
            if n == 1:
                return True
        return False

    def sumOfSquares(self, n: int) -> int:
        output = 0
        while n:
            digit = n % 10
            digit = digit ** 2
            output += digit
            n = n // 10
        return output

```

* **Time Complexity:** $O(\log n)$ to find the next number, which determines the length of the sequence.
* **Space Complexity:** $O(\log n)$ to store the numbers in the hash set.

---

## 2. Fast And Slow Pointers - I (Floyd's Cycle Detection)

### Intuition

Instead of storing all visited numbers, we can detect a cycle using the fast and slow pointers technique (also known as Floyd's cycle detection).

The idea is to treat the transformation `n -> sumOfSquares(n)` like moving through a linked list. We use two pointers:

* `slow` moves one step at a time.
* `fast` moves two steps at a time.

If there is a cycle, `slow` and `fast` will eventually meet. If the cycle includes `1`, then the number is happy. This avoids extra memory and still reliably detects cycles.

### Algorithm

1. Initialize `slow = n` and `fast = sumOfSquares(n)`.
2. While `slow != fast`:
* Move `slow` one step: `slow = sumOfSquares(slow)`
* Move `fast` two steps: `fast = sumOfSquares(sumOfSquares(fast))`


3. When the loop ends, a cycle is detected (because `slow == fast`).
4. If `fast == 1`, the cycle ends at `1`, so return `True`.
5. Otherwise, the cycle does not include `1`, so return `False`.

```python
class Solution:
    def isHappy(self, n: int) -> bool:
        slow, fast = n, self.sumOfSquares(n)

        while slow != fast:
            fast = self.sumOfSquares(fast)
            fast = self.sumOfSquares(fast)
            slow = self.sumOfSquares(slow)
            
        return True if fast == 1 else False

    def sumOfSquares(self, n: int) -> int:
        output = 0
        while n:
            digit = n % 10
            digit = digit ** 2
            output += digit
            n = n // 10
        return output

```

* **Time Complexity:** $O(\log n)$
* **Space Complexity:** $O(1)$ since we only store two pointers.

---

## 3. Fast And Slow Pointers - II (Brent's Algorithm)

### Intuition

This solution uses a different cycle detection method called Brent's Algorithm, which is another form of the fast–slow pointer technique.

Instead of moving one pointer twice as fast every single step, we increase the distance between comparisons in **powers of two**. This reduces the number of function evaluations and still guarantees cycle detection.
We keep track of:

* `slow` $\rightarrow$ a checkpoint value.
* `fast` $\rightarrow$ the moving value.
* `power` $\rightarrow$ how far we go before resetting `slow`.
* `lam` $\rightarrow$ current distance since the last reset.

If `fast` ever equals `slow`, a cycle is detected.

### Algorithm

1. Initialize `slow = n`, `fast = sumOfSquares(n)`.
2. Initialize `power = 1` (current block size) and `lam = 1` (steps taken in current block).
3. While `slow != fast`:
* If `power == lam`:
* Move the checkpoint: `slow = fast`
* Double the block size: `power *= 2`
* Reset step counter: `lam = 0`


* Move `fast` one step forward: `fast = sumOfSquares(fast)`.
* Increment `lam` by 1.


4. When the loop ends, a cycle is detected.
5. If `fast == 1`, return `True`. Otherwise, return `False`.

```python
class Solution:
    def isHappy(self, n: int) -> bool:
        slow, fast = n, self.sumOfSquares(n)
        power = lam = 1

        while slow != fast:
            if power == lam:
                slow = fast
                power *= 2
                lam = 0
            fast = self.sumOfSquares(fast)
            lam += 1
            
        return True if fast == 1 else False

    def sumOfSquares(self, n: int) -> int:
        output = 0
        while n:
            digit = n % 10
            digit = digit ** 2
            output += digit
            n = n // 10
        return output

```

* **Time Complexity:** $O(\log n)$
* **Space Complexity:** $O(1)$