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
}

const newNode = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
newNode.prettyPrint(newNode.root)