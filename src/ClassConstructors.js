class Node {
    constructor(value = null) {
        this.value = value;
        this.right = null;
        this.left = null;
    };
}

class Tree {
    constructor(array) {
        this.data = array;
    }
}

function mergeSortAndRemoveDuplicates(array) {
    if (array.length === 0) return "Please Enter An Array With At Least 1 Item";
    if (!Array.isArray(array)) return "Please Enter An Array Of Numbers";
    if (array.length === 1) return array;
    const left = mergeSortAndRemoveDuplicates(array.slice(0, array.length / 2));
    const right = mergeSortAndRemoveDuplicates(array.slice(array.length / 2));
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

function buildTree(array) {
    let sortedArray = mergeSortAndRemoveDuplicates(array);
    console.log(sortedArray);
}

buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

// export { Node, Tree };