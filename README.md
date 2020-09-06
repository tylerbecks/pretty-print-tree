The algorithm pretty prints items in the console.

For example:
```
const tree = new BST(5);

tree.add(3);
tree.add(8);
tree.add(9);
tree.add(1);
tree.add(12);
tree.add(10);
tree.add(4);
tree.add(6);
tree.add(7);
tree.add(2);

tree.print();
```
will result in:
```
'                5'
'        3               8'
'    1       4       6       9'
'  x   2   x   x   x   7   x   12'
' x x x x x x x x x x x x x x 10 x'
```

Known limitations:
* It does not work well with double digits or higher (it throws off the spacing)

TODO:
* Support double digit numbers or higher
* Add lines between children
* Add () around nodes