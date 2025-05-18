Input:
1. origin: x,y
2. left boundary: sequence of line segments: l1, l2, l3 .... ln
3. right boundary: seq of line segments: r1, r2, ... rm
4. Subtree

output:
layout of subtree such that it fits in left and right boundary

Idea:
assume that subtree has just one edge e
e = (u, v)
let u = orignin
so find position v
draw u, v along the bisector of l1 and r1
if uv intersects with any lines in l1, l2, ... or r1, r2, ....
then use similar process like binary search to find new length.
