![Multiply Strings](/asset/images/MultiplyStrings.png)

---

## 1. Multiplication & Addition

### Intuition
This approach mimics how we multiply numbers by hand. We multiply the larger number by each digit of the smaller number (starting from the rightmost digit), shifting the result appropriately by appending zeros. Then we add all these partial products together. This simulates the grade-school multiplication algorithm but operates entirely on strings to handle arbitrarily large numbers.

### Algorithm
1. If either number is `"0"`, return `"0"` immediately.
2. Ensure `num1` is the longer number (swap if needed for efficiency).
3. For each digit in `num2` from right to left:
   * Multiply `num1` by that single digit using a helper function.
   * Append the appropriate number of trailing zeros based on the digit's position.
   * Add this partial result to the running total using a string addition helper.
4. The string addition and multiplication helpers handle carry values and build the result digit by digit.
5. Return the accumulated `res`.

```python
class Solution:
    def multiply(self, num1: str, num2: str) -> str:
        if num1 == "0" or num2 == "0":
            return "0"

        if len(num1) < len(num2):
            return self.multiply(num2, num1)

        res, zero = "", 0
        for i in range(len(num2) - 1, -1, -1):
            cur = self.mul(num1, num2[i], zero)
            res = self.add(res, cur)
            zero += 1

        return res

    def mul(self, s: str, d: str, zero: int) -> str:
        i, carry = len(s) - 1, 0
        d = int(d)
        cur = []

        while i >= 0 or carry:
            n = int(s[i]) if i >= 0 else 0
            prod = n * d + carry
            cur.append(str(prod % 10))
            carry = prod // 10
            i -= 1

        return ''.join(cur[::-1]) + '0' * zero

    def add(self, num1: str, num2: str) -> str:
        i, j, carry = len(num1) - 1, len(num2) - 1, 0
        res = []

        while i >= 0 or j >= 0 or carry:
            n1 = int(num1[i]) if i >= 0 else 0
            n2 = int(num2[j]) if j >= 0 else 0
            total = n1 + n2 + carry
            res.append(str(total % 10))
            carry = total // 10
            i -= 1
            j -= 1

        return ''.join(res[::-1])
```
* **Time Complexity:** $O(\min(m, n) \cdot (m + n))$ where $m$ and $n$ are the lengths of `num1` and `num2`.
* **Space Complexity:** $O(m + n)$ to store the intermediate results and strings.

---

## 2. Multiplication (Optimized Array)

### Intuition
Instead of generating partial products and adding them as separate strings, we can use a single result array to accumulate all digit multiplications in place. When we multiply digit `i` of `num1` by digit `j` of `num2`, the result contributes to position `i + j` in the final answer. By reversing both strings first, we can work with indices that naturally align with place values. After processing all digit pairs, we handle carries and convert the result array back to a string.

### Algorithm
1. If either number is `"0"`, return `"0"` immediately.
2. Create a result array of size `len(num1) + len(num2)` initialized to zeros.
3. Reverse both input strings so index `0` corresponds to the ones place.
4. For each pair of indices `(i1, i2)`:
   * Multiply the corresponding digits.
   * Add the product to `res[i1 + i2]`.
   * Propagate any carry to `res[i1 + i2 + 1]`.
   * Keep only the ones digit at `res[i1 + i2]`.
5. Reverse the `res` array, skip leading zeros, and join the digits into a string.

```python
class Solution:
    def multiply(self, num1: str, num2: str) -> str:
        if "0" in [num1, num2]:
            return "0"

        res = [0] * (len(num1) + len(num2))
        num1, num2 = num1[::-1], num2[::-1]
        
        for i1 in range(len(num1)):
            for i2 in range(len(num2)):
                digit = int(num1[i1]) * int(num2[i2])
                res[i1 + i2] += digit
                res[i1 + i2 + 1] += res[i1 + i2] // 10
                res[i1 + i2] = res[i1 + i2] % 10

        res, beg = res[::-1], 0
        while beg < len(res) and res[beg] == 0:
            beg += 1
            
        res = map(str, res[beg:])
        return "".join(res)
```
* **Time Complexity:** $O(m \cdot n)$ where $m$ and $n$ are the lengths of `num1` and `num2`.
* **Space Complexity:** $O(m + n)$ for the result array.