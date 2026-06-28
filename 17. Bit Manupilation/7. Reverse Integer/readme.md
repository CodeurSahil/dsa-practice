![Reverse Integer](/asset/images/ReverseInteger.png)

---

## 1. Brute Force (String Manipulation)

### Intuition
A very simple way to do this is to temporarily ignore the sign and work with the absolute value. By converting the number to a string, digits become easy to manipulate. We can simply reverse the string, convert it back to an integer, and restore the original sign if `x` was negative.

Finally, we must check if the reversed number fits in a 32-bit signed integer range. This approach is beginner-friendly because it uses direct operations on strings instead of manual digit math.

### Algorithm
1. Save the original value of `x` in `org` so we remember its sign.
2. Convert `x` to its absolute value.
3. Convert the number to a string and reverse it.
4. Convert the reversed string back to an integer `res` (this automatically removes leading zeros).
5. If the original number was negative, make `res` negative.
6. Check if `res` fits in the 32-bit signed integer range:
   * If it does not, return `0`.
   * Otherwise, return the reversed number `res`.

```python
class Solution:
    def reverse(self, x: int) -> int:
        org = x
        x = abs(x)
        res = int(str(x)[::-1])
        
        if org < 0:
            res *= -1
            
        if res < -(1 << 31) or res > (1 << 31) - 1:
            return 0
            
        return res

```

* **Time Complexity:** $O(1)$ (Technically $O(\log_{10} x)$, but since $x$ is bounded by 32 bits, it is constant).
* **Space Complexity:** $O(1)$ (Bounded by 10 characters).

---

## 2. Recursion

### Intuition

Instead of reversing digits using strings, this approach uses pure arithmetic and recursion. The idea is simple: take the last digit of the number, append it to a running reversed value, and remove the last digit from the number. Repeat until the number becomes 0.

Recursion naturally fits this process because each step reduces the problem size by one digit.

### Algorithm

1. Determine the sign of the number (+ or -) and work with its absolute value.
2. Define a recursive function `rec(n, rev)` that takes the remaining number `n` and the reversed number built so far `rev`:
* **Base case:** If `n` is `0`, return `rev`.
* **Recursive step:** Extract the last digit using modulo (`n % 10`), append it to `rev` (`rev * 10 + digit`), and recurse on the remaining number (`n // 10`).


3. After recursion finishes, restore the original sign.
4. Check for 32-bit signed integer overflow. If overflow occurs, return `0`.

```python
class Solution:
    def reverse(self, x: int) -> int:
        def rec(n: int, rev: int) -> int:
            if n == 0:
                return rev

            rev = rev * 10 + n % 10
            return rec(n // 10, rev)

        sign = -1 if x < 0 else 1
        x = abs(x)
        reversed_num = rec(x, 0)
        reversed_num *= sign
        
        if reversed_num < -(1 << 31) or reversed_num > (1 << 31) - 1:
            return 0

        return reversed_num

```

* **Time Complexity:** $O(1)$ (Maximum 10 recursive calls for a 32-bit integer).
* **Space Complexity:** $O(1)$ (Call stack depth is bounded by 10).

---

## 3. Iteration (Mathematical Approach)

### Intuition

The key idea is to build the reversed number digit by digit using math: repeatedly take the last digit of the number, append it to the end of a running `res`, and remove the last digit from the original number.

However, before appending a new digit, we must check for overflow. If multiplying `res` by 10 (and adding the new digit) would exceed the 32-bit signed integer limits, we immediately return `0`. This approach closely matches how integer reversal works at a low level and is both efficient and safe.

### Algorithm

1. Define constants `MIN = -2^31` and `MAX = 2^31 - 1`.
2. Initialize `res = 0` to store the reversed number.
3. While `x` is not `0`:
* Extract the last digit `digit` of `x`. (Note: in Python, the modulo operator `%` on negative numbers works differently than in C/Java, so `math.fmod` is used to truncate towards zero).
* Remove the last digit from `x` (using integer division truncating towards zero `int(x / 10)`).
* Before updating `res`, check if `res * 10 + digit` would overflow:
* If `res > MAX // 10` or (`res == MAX // 10` and `digit > MAX % 10`), return `0`.
* If `res < int(MIN / 10)` or (`res == int(MIN / 10)` and `digit < MIN % 10`), return `0`.


* Update `res = (res * 10) + digit`.


4. After the loop finishes, return `res`.

```python
import math

class Solution:
    def reverse(self, x: int) -> int:
        MIN = -2147483648  # -2^31
        MAX = 2147483647   #  2^31 - 1

        res = 0
        while x:
            # math.fmod handles negative numbers correctly by truncating towards zero
            digit = int(math.fmod(x, 10))
            x = int(x / 10)

            # Check for positive overflow
            if res > MAX // 10 or (res == MAX // 10 and digit > MAX % 10):
                return 0
                
            # Check for negative overflow
            # Note: in Python integer division for negative numbers rounds down,
            # so we use int(MIN / 10) for truncating towards zero logic
            if res < int(MIN / 10) or (res == int(MIN / 10) and digit < MIN % 10):
                return 0
                
            res = (res * 10) + digit

        return res

```

* **Time Complexity:** $O(1)$ (Processing at most 10 digits).
* **Space Complexity:** $O(1)$
