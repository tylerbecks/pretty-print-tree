class Node {
  constructor(value) {
    this.value = value;
    this.left  = null;
    this.right = null;
  }
}

class BST {
  constructor(value) {
    this.root = new Node(value);
  }
  
  add(value) {
    let curr = this.root;

    while (true) {
      if (value === curr.value) {
        throw Error('dont add duplicates')
      } else if (value > curr.value) {
        if (!curr.right) {
          curr.right = new Node(value);
          break
        }
        curr = curr.right;
      } else {
        if (!curr.left) {
          curr.left = new Node(value);
          break;
        }

        curr = curr.left;
      }
    }
  }
  
  getLevels() {
    const levels = [[this.root]];
    let isLastLevel = false;

    while (!isLastLevel) {
      const lastLevel = levels[levels.length - 1];
      const nextLevel = getNextLevel(lastLevel);

      if (!nextLevel) {
        isLastLevel = true;
      } else {
        levels.push(nextLevel);
      }
    }

    return levels;
  }

  print() {
    const levels = this.getLevels();
    const valueLevels = levels.map(level => (
      level.map(n => n ? n.value : 'x')
    ))
    
    const strLevels = valueLevels.map(l => ' ' + l.join(' '));

    // add spacing
    for (let i = 1; i < strLevels.length; i++) {
      let j = i - 1;
      
      while (j >= 0) {
        const splitLevel = splitCharsAndSpaces(strLevels[j]);
        strLevels[j] = splitLevel.join(' ')
        j--;
      }
    }

    for (let i = 0; i < strLevels.length; i++) {
      console.log(strLevels[i])
    }
  }
}

// This custom split function is necessary because calling '1 2 10'.split('')
// will split any digits greater than 10 ['1', ' ', '2', ' ', '1', '0']
// this function will return ['1', ' ', '2', ' ', '10']
const splitCharsAndSpaces = (str) => {
  const result = [];
  
  let building = ''
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ') {
      result.push(str[i])
    } else {
      building += str[i];
      // if we are at end of str or next character is a space, we found the end of our current char
      if (i === str.length - 1 || str[i + 1] === ' ') {
        result.push(building);
        building = '';
      }
    }
  }

  return result;
}

const getNextLevel = (prevLevel) => {
  let isEmpty = true;
  const nextLevel = [];

  prevLevel.forEach((node) => {
  const isLeaf = node && !node.left && !node.right;

    if (!node || isLeaf) {
      nextLevel.push(null); // push left
      nextLevel.push(null); // push right
    } else {
      isEmpty = false;
      nextLevel.push(node.left);
      nextLevel.push(node.right);
    }
  })
  
  if (isEmpty) {
    return null;
  }
  
  return nextLevel;
};

const tree = new BST(5);

tree.add(3);
tree.add(8);
tree.add(9);
tree.add(1);
tree.add(12);
tree.add(10);
tree.add(4);
tree.add(6)
tree.add(7);

tree.add(2);

tree.print()

// five.left = three;
// five.right = eight;
// three.left = one;
// three.right = four;
// one.right = two;
// eight.left = seven;
// eight.right = nine;
// nine.right = ten;

//           5 LEVELS
//                5
//        3               8
//    1       4       7       9
//  n   2   n   n   n   n   n   n
// n n n n n n n n n n n n n n n n

// 1. 15 spaces
// 2. 7 spaces, 15 spaces
// 3. 3 spaces, 7 spaces
// 4. 1 spaces, 3 space
// 5. 0 spaces, 1 space

//    4 LEVELS
//        5
//    3       8
//  1   4   7   9
// n 2 n n n n n 10


// 1. 7 spaces
// 2. 3 spaces, 7 spaces
// 3. 1 spaces, 3 spaces
// 4. 0 spaces, 1 space

// 1. Add 1
//   a. Add level
// 2. Add 2
//   a. Add level
//   b. Back to 1
//     1. 1 space before first
// 3. Add 3
//   a. Add level
//   b. Back to 2
//     1. 1 space before first
//     2. 2 spaces before each subsequent element
//   b. Back to 1, add 2 space in front
// 4. Add 4
//   a. Add level
//   b. Back to 3
//     1. 1 space before first
//     2. 2 spaces before each subsequent element
//   b. Back to 2
//     1. 2 spaces before first
//     2. 4 spaces before each subsequent element
//   b. Back to 1
//     1. 4 spaces before first
