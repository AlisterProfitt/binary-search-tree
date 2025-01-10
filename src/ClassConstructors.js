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
        if (array.length === 0) return "Please Enter An Array With At Least 1 Item";
        if (!Array.isArray(array)) return "Please Enter An Array Of Numbers";
        if (array.length === 1) return array;
        const left = this.mergeSortAndRemoveDuplicates(array.slice(0, array.length / 2));
        const right = this.mergeSortAndRemoveDuplicates(array.slice(array.length / 2));
        const sortedArray = [];
        for (let i = 0, lIndex = 0, rIndex = 0; i < (left.length + right.length); i++) {
            if (typeof left[lIndex] === 'undefined' || right[rIndex] < left[lIndex]) {
                sortedArray.push(right[rIndex++])
            } else if (typeof right[rIndex] === 'undefined' || left[lIndex] < right[rIndex]) {
                sortedArray.push(left[lIndex++])
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
        function insertNewNode(node) {
            if (node.left === null && node.right === null) {
                value > node.data ? node.right = new Node(value) : node.left = new Node(value);
                return;
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

    find(value, node = this.root) {
        if (!node) {
            return 'Not Found'
        }

        if (node.data === value) {
            return node;
        }
        
        if (value < node.data) {
            return this.find(value, node.left)
        }
        
        if (value > node.data) {
            return this.find(value, node.right)
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

    // levelOrderRecursive dummy methods
    height(root = this.root) {
        //base case
        if (root === null) {
            return 0;
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

    }
}

const newTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// newTree.insert(7);
// newTree.insert(324);
// newTree.insert(325);
newTree.insert(8);
newTree.deleteItem(67)
newTree.prettyPrint(newTree.root)
console.log(newTree.height());

function logTreeEntries(node) {
    console.log(node.data);
}
