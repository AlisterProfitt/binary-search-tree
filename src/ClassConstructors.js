class Node {
    constructor(data = null, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    };
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    mergeSortAndRemoveDuplicates(array) {
        if (array.length === 0) {
            return "Please Enter An Array With At Least 1 Item";
        }

        if (!Array.isArray(array)) {
            return "Please Enter An Array Of Numbers";
        }
        
        if (array.length === 1) {
            return array;
        }

        const left = this.mergeSortAndRemoveDuplicates(array.slice(0, array.length / 2));
        const right = this.mergeSortAndRemoveDuplicates(array.slice(array.length / 2));
        const sortedArray = [];
        for (let i = 0, lIndex = 0, rIndex = 0; i < (left.length + right.length); i++) {
            if (typeof left[lIndex] === 'undefined' || right[rIndex] < left[lIndex]) {
                sortedArray.push(right[rIndex++])
            } else if (typeof right[rIndex] === 'undefined' || left[lIndex] < right[rIndex]) {
                sortedArray.push(left[lIndex++])
            } else {
                lIndex++
            }
        }
        return sortedArray;
    }

    createNode(array, start, end) {
        if (start > end) {
            return;
        }

        const mid = Math.floor((start + end) / 2);
        const leftNode = this.createNode(array, start, mid - 1);
        const rightNode = this.createNode(array, mid + 1, end);
        const rootNode = new Node(array[mid], leftNode, rightNode);
        return rootNode;
    }

    buildTree(array) {
        const sortedArray = this.mergeSortAndRemoveDuplicates(array);
        return this.createNode(sortedArray, 0, sortedArray.length-1);
    }

    prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }

        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }

        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

    insert(value) {
        if (value === null || value === undefined) {
            throw new Error('Please provide a value');
        }

        function insertNewNode(node) {
            if (node === null) {
                return;
            }

            if (node.left === null && value < node.data) {
                node.left = new Node(value);
            } 
            
            if (node.right === null && value > node.data) {
                node.right = new Node(value)
            };

            if (value > node.data) {
                insertNewNode(node.right);
            }

            if (value < node.data) {
                insertNewNode(node.left);
            }
        }
        
        insertNewNode(this.root)
    }

    deleteItem(value, root = this.root) {
        function getSuccessor(current) {
            current = current.right;
            while (current !== null && current.left !== null) {
                current = current.left;
            }

            return current
        }

        if (root === null) {
            return root;
        }

        if (root.data > value) {
            root.left = this.deleteItem(value, root.left);
        } else if (root.data < value) {
            root.right = this.deleteItem(value, root.right);
        } else {
            if (root.left === null) {
                return root.right;
            }

            if (root.right === null) {
                return root.left;
            }

            let successor = getSuccessor(root);
            root.data = successor.data;
            root.right = this.deleteItem(successor.data, root.right);
        }

        return root;
    }

    findNode(value, node = this.root) {
        if (!node) {
            return 'Not Found'
        }

        if (node.data === value) {
            return node;
        }
        
        if (value < node.data) {
            return this.findNode(value, node.left)
        }
        
        if (value > node.data) {
            return this.findNode(value, node.right)
        }
    }

    levelOrderIterative(callback) {
        if (!callback) {
            throw new Error('A callback is required');
        }

        const queue = [this.root];
        while (queue.length) {
            callback(queue[0]);
            if (queue[0].left) {
                queue.push(queue[0].left);
            }

            if (queue[0].right) {
                queue.push(queue[0].right)
            }

            queue.shift()
        }
    }

    height(root = this.root) {
        if (root === null) {
            return -1;
        } else {
            const leftHeight = this.height(root.left);
            const rightHeight = this.height(root.right);
            if (leftHeight > rightHeight) {
                return leftHeight + 1;
            } else {
                return rightHeight + 1;
            }
        }
    }

    levelOrderRecursive(callback) {
        if (!callback) {
          throw new Error("A callback is required");
        }

        const height = this.height();
        const root = this.root;
        for (let i = 0; i <= height; i++) {
            visitLevel(root, i)
        }

        function visitLevel(root, level) {
            if (root === null) {
              return;
            }

            if (level === 0) {
              callback(root);
            } else {
                visitLevel(root.left, level - 1);
                visitLevel(root.right, level - 1);
            }
        }
    }

    preOrder(callback, root = this.root) {
        if (!callback) {
            throw new Error("A callback is required");
        }

        if (root === null) {
            return
        }

        callback(root);
        this.preOrder(callback, root.left);
        this.preOrder(callback, root.right);
    }

    inOrder(callback, root = this.root) {
        if (!callback) {
            throw new Error("A callback is required");
        }

        if (root === null) {
          return;
        }

        this.inOrder(callback, root.left);
        callback(root);
        this.inOrder(callback, root.right);
    }

    postOrder(callback, root = this.root) {
        if (!callback) {
            throw new Error('A callback is required');
        }

        if (root === null) {
            return root;
        }

        this.postOrder(callback, root.left);
        this.postOrder(callback, root.right);
        callback(root);
    }

    depth(node, root = this.root) {
        if (!node) {
            throw Error('Provide Valid Node');
        }

        if (root === null) {
            return -1;
        }
        
        let dist = -1;
        if (node === root) {
            return dist + 1;
        }

        if ((dist = this.depth(node, root.left)) >= 0) {
            return dist + 1;
        }

        if ((dist = this.depth(node, root.right)) >= 0) {
            return dist + 1;
        }

        return dist;
    }

    isBalanced() {
        const height = this.height.bind(this);
        function checkBalance(root) {
            if (root === null) {
                return;
            }
            
            const leftHeight = height(root.left);
            const rightHeight = height(root.right);
            if (leftHeight - rightHeight > 1 || rightHeight - leftHeight > 1) {
                return false;
            }
            
            const leftBoolean = checkBalance(root.left);
            const rightBoolean = checkBalance(root.right);
            if (leftBoolean === false || rightBoolean === false) {
                return false;
            }

            return true;
        }
        
        return checkBalance(this.root);
    }

    rebalance() {
        const treeValues = []
        function getValues(node){
            treeValues.push(node.data)
        }

        this.inOrder(getValues);
        this.root = this.createNode(treeValues, 0, treeValues.length - 1);
    }
}

function randomNumbers(lowest, highest, amount) {
    if (amount <= 0) {
        throw new Error('Please provide a number above 0');
    }

    const randomNumbersArray = [];

    for (i = 0; i < amount; i++) {
        const randomNumberInRange = Math.floor(Math.random() * (highest - lowest) + lowest);
        randomNumbersArray.push(randomNumberInRange);
    }

    return randomNumbersArray
}

// console.log(randomNumbers(100, 500, 10));

const newTree = new Tree([
  81, 35, 72, 92, 73, 86, 29, 58, 5, 85, 26, 39, 53, 5, 0, 35, 54, 0, 33, 34,
  58, 92, 57, 77, 48, 93, 32, 44, 32, 22, 33, 42, 18, 7, 94, 95, 82, 25
]);

function logTreeEntries(node){
    console.log(node.data);
}

newTree.insert(115)
newTree.insert(392)
newTree.insert(319)
newTree.insert(285)
newTree.insert(248)
newTree.insert(204)
newTree.insert(257)
newTree.insert(134)
newTree.insert(418)
newTree.insert(269)
// newTree.prettyPrint(newTree.root);
// newTree.rebalance();
// console.log(newTree.isBalanced());
// newTree.prettyPrint(newTree.root)
newTree.inOrder(logTreeEntries)
console.log('-----------------------------------------------------------------------');
newTree.preOrder(logTreeEntries)
console.log('-----------------------------------------------------------------------');
newTree.postOrder(logTreeEntries)
console.log('-----------------------------------------------------------------------');
newTree.levelOrderIterative(logTreeEntries)