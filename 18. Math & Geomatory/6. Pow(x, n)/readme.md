![Pow(x, n)](/asset/images/Pow(x,n).png)

---

## 1. Brute Force

### Intuition
The most straightforward way to think about exponentiation is multiplying $x$ by itself $n$ times. This brute force approach directly follows the mathematical definition of power:
* If $n$ is positive $\rightarrow$ multiply $x$ repeatedly.
* If $n$ is zero $\rightarrow$ the result is always $1$.
* If $n$ is negative $\rightarrow$ compute $x^{\vert{}n\vert{}}$ and take its reciprocal.

Although this method is not efficient for large $n$, it is very easy to understand and is a good starting point.

### Algorithm
1. Handle edge cases:
   * If `x == 0`, return `0`.
   * If `n == 0`, return `1`.
2. Initialize `res = 1` to store the result.
3. Repeat `abs(n)` times: multiply `res` by `x`.
4. If $n$ is positive: return `res`.
5. If $n$ is negative: return `1 / res`.

```python
class Solution:
    def myPow(self, x: float, n: int) -> float:
        if x == 0:
            return 0
        if n == 0:
            return 1

        res = 1
        for i in range(abs(n)):
            res *= x
        return res if n >= 0 else 1 / res
```
* **Time Complexity:** $O(n)$
* **Space Complexity:** $O(1)$

---

## 2. Binary Exponentiation (Recursive)

### Intuition
Computing $x^n$ by multiplying $x$ repeatedly works, but it becomes very slow when $n$ is large. A much better idea is to use binary exponentiation, which is based on these observations:
* If $n$ is even: $x^n = (x^2)^{n/2}$
* If $n$ is odd: $x^n = x \times (x^2)^{(n-1)/2}$

This means we can halve the exponent at each step and square the base accordingly. By doing this recursively, the number of multiplications reduces from $O(n)$ to $O(\log n)$. 
We also handle negative powers by computing $x^{\vert{}n\vert{}}$ and taking the reciprocal if $n$ is negative.

### Algorithm
1. Define a recursive helper function `helper(x, n)`:
   * If `x == 0`, return `0`.
   * If `n == 0`, return `1`.
   * Recursively compute: `res = helper(x * x, n // 2)`.
   * If $n$ is odd: return `x * res`.
   * If $n$ is even: return `res`.
2. Call `helper(x, abs(n))` to compute the magnitude.
3. If $n$ is negative: return `1 / res`.
4. Otherwise: return `res`.

```python
class Solution:
    def myPow(self, x: float, n: int) -> float:
        def helper(x, n):
            if x == 0:
                return 0
            if n == 0:
                return 1

            res = helper(x * x, n // 2)
            return x * res if n % 2 else res

        res = helper(x, abs(n))
        return res if n >= 0 else 1 / res
```
* **Time Complexity:** $O(\log n)$
* **Space Complexity:** $O(\log n)$ for the recursion stack.

---

## 3. Binary Exponentiation (Iterative)

### Intuition
We want to compute $x^n$ efficiently, even when $n$ is very large (positive or negative). The brute force approach multiplies $x$ repeatedly and takes $O(n)$ time, which is too slow.

Instead, we use iterative binary exponentiation, which reduces the time complexity to $O(\log n)$. The key ideas are:
* Any number $n$ can be written in binary.
* If the current power is odd, we must include one extra $x$ in the result.
* We repeatedly: square the base (`x = x * x`) and halve the exponent (`power >>= 1`).

For negative powers ($x^n = \frac{1}{x^{\vert{}n\vert{}}}$), we compute using `abs(n)` and take the reciprocal at the end if needed. This iterative version avoids recursion and works efficiently with constant extra space.

### Algorithm
1. Handle edge cases:
   * If `x == 0`, return `0`.
   * If `n == 0`, return `1`.
2. Initialize `res = 1` (stores the final answer) and `power = abs(n)` (work with positive exponent).
3. While `power > 0`:
   * If `power` is odd (`power & 1`): multiply `res` by `x`.
   * Square the base: `x = x * x`.
   * Divide the exponent by 2: `power >>= 1`.
4. If $n$ is negative: return `1 / res`.
5. Otherwise: return `res`.

```python
class Solution:
    def myPow(self, x: float, n: int) -> float:
        if x == 0:
            return 0
        if n == 0:
            return 1

        res = 1
        power = abs(n)

        while power:
            if power & 1:
                res *= x
            x *= x
            power >>= 1

        return res if n >= 0 else 1 / res
```
* **Time Complexity:** $O(\log n)$
* **Space Complexity:** $O(1)$
