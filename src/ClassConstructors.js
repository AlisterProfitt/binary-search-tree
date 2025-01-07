class Node {
    constructor(value = null) {
        this.value = value;
        this.right = null;
        this.left = null;
    };
}

class Tree {
    constructor() {
        this.root = null
    }
}

export { Node, Tree };