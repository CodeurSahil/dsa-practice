![Detect Squares](/asset/images/DetectSquares.png)
![Detect Squares](/asset/images/DetectSquares2.png)
![Detect Squares](/asset/images/DetectSquares3.png)

---

## 1. Hash Map - I

### Intuition
We are asked to count how many axis-aligned squares can be formed using a given point as one corner and previously added points as the other three corners.

Key observations about an axis-aligned square:
* All sides are parallel to the x-axis and y-axis.
* If `(px, py)` is one corner and `(x, y)` is the diagonal opposite corner, then:
  * `|px - x| == |py - y|` (equal side lengths).
  * `x != px` and `y != py` (otherwise it would not form a square).
* The other two required corners must be `(x, py)` and `(px, y)`.

So the idea is:
1. Fix the query point `(px, py)`.
2. Try every previously added point `(x, y)` as a possible diagonal.
3. If it forms a valid square diagonal, multiply how many times the other two required points exist.

A hash map lets us quickly check how many times a specific point was added.

### Algorithm
**Data Structures**
* `ptsCount`: a hash map storing how many times each point appears.
* `pts`: a list of all added points (including duplicates).

**`add(point)`**
* Increment the count of `point` in `ptsCount`.
* Append `point` to the list `pts`.

**`count(point)`**
1. Initialize `res = 0`.
2. Let `(px, py)` be the query point.
3. For every stored point `(x, y)` in `pts`:
   * Check if `(x, y)` can be the diagonal opposite corner: `abs(px - x) == abs(py - y)` and `x != px` and `y != py`.
   * If not valid, skip.
   * If valid, the other two corners must be `(x, py)` and `(px, y)`.
   * Add to the result: `ptsCount[(x, py)] * ptsCount[(px, y)]`.
4. Return `res`.

```python
class CountSquares:
    def __init__(self):
        self.ptsCount = defaultdict(int)
        self.pts = []

    def add(self, point: List[int]) -> None:
        self.ptsCount[tuple(point)] += 1
        self.pts.append(point)

    def count(self, point: List[int]) -> int:
        res = 0
        px, py = point
        for x, y in self.pts:
            if (abs(py - y) != abs(px - x)) or x == px or y == py:
                continue
            res += self.ptsCount[(x, py)] * self.ptsCount[(px, y)]
        return res
```
* **Time Complexity:** $O(1)$ for `add()`, $O(n)$ for `count()`.
* **Space Complexity:** $O(n)$

---

## 2. Hash Map - II

### Intuition
We want to count how many axis-aligned squares can be formed using the given query point `(x1, y1)` as one corner.

For an axis-aligned square:
* One side is vertical and one side is horizontal.
* If we pick another point `(x1, y2)` on the same vertical line (same `x1`), then:
  * the side length is `side = y2 - y1`.
  * this determines where the square’s other x-coordinates must be:
    * `x3 = x1 + side` (square to the right)
    * `x4 = x1 - side` (square to the left)

So for each possible vertical partner `(x1, y2)`, we can form up to two squares:
* **Square to the right** needs points: `(x3, y1)` and `(x3, y2)`.
* **Square to the left** needs points: `(x4, y1)` and `(x4, y2)`.

Because points can be added multiple times, the total number of squares is the product of the counts of the required points. This version uses a nested hash map: `ptsCount[x][y] = count`, which makes counting fast and avoids storing a linear list of all points.

### Algorithm
**Data Structure**
* `ptsCount`: nested hash map where the outer key is the x-coordinate, the inner key is the y-coordinate, and the value is the count of that point.

**`add(point)`**
* Let the point be `(x, y)`.
* Increment `ptsCount[x][y]`.

**`count(point)`**
1. Initialize `res = 0`.
2. Let the query point be `(x1, y1)`.
3. Iterate over all `y2` such that a point `(x1, y2)` exists (same x-coordinate):
   * Compute the side length: `side = abs(y2 - y1)`. *(Note: Using pure subtraction `y2 - y1` works too since we generate both `+side` and `-side` positions)*. Let's use `side = y2 - y1`.
   * If `side == 0`, skip (same point, no square).
   * Compute possible horizontal positions: `x3 = x1 + side` (right square) and `x4 = x1 - side` (left square).
   * Add squares formed to the right: `ptsCount[x1][y2] * ptsCount[x3][y1] * ptsCount[x3][y2]`.
   * Add squares formed to the left: `ptsCount[x1][y2] * ptsCount[x4][y1] * ptsCount[x4][y2]`.
4. Return `res`.

```python
class CountSquares:
    def __init__(self):
        self.ptsCount = defaultdict(lambda: defaultdict(int))

    def add(self, point: List[int]) -> None:
        self.ptsCount[point[0]][point[1]] += 1

    def count(self, point: List[int]) -> int:
        res = 0
        x1, y1 = point
        for y2 in self.ptsCount[x1]:
            side = y2 - y1
            if side == 0:
                continue

            x3, x4 = x1 + side, x1 - side
            res += (self.ptsCount[x1][y2] * self.ptsCount[x3][y1] *
                    self.ptsCount[x3][y2])

            res += (self.ptsCount[x1][y2] * self.ptsCount[x4][y1] *
                    self.ptsCount[x4][y2])
        return res
```
* **Time Complexity:** $O(1)$ for `add()`, $O(n)$ for `count()`.
* **Space Complexity:** $O(n)$
