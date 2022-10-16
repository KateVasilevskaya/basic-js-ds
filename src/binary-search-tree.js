const { NotImplementedError } = require("../extensions/index.js");

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class Node {
  constructor(value) {
    this.data = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }
  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);
    if (this.rootNode === null) {
      this.rootNode = newNode;
      return this;
    }
    let current = this.rootNode;
    while (current) {
      if (data === current.data) return undefined;
      if (data < current.data) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  has(data) {
    let current = this.rootNode;

    while (current) {
      if (current.data === data) {
        return true;
      }

      current = data < current.data ? current.left : current.right;
    }

    return false;
  }

  find(data) {
    let current = this.rootNode;

    while (current) {
      if (current.data === data) {
        return current;
      }

      current = data < current.data ? current.left : current.right;
    }

    return null;
  }

  remove(data) {
    this.rootNode = removeNode(this.rootNode, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else if (node.data > data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let currentData = node.right.data;
        let nextNode = node.right.left;

        while (nextNode) {
          currentData = nextNode.data;
          nextNode = nextNode.left;
        }

        node.data = currentData;

        node.right = removeNode(node.right, currentData);

        return node;
      }
    }
  }

  min() {
    let current = this.rootNode;

    while (current && current.left) {
      current = current.left;
    }

    return current ? current.data : null;
  }

  max() {
    let current = this.rootNode;

    while (current && current.right) {
      current = current.right;
    }

    return current ? current.data : null;
  }
}

module.exports = {
  BinarySearchTree,
};

const tree = new BinarySearchTree();
tree.add(2);
tree.add(9);
tree.add(14);
tree.add(54);
tree.add(2);
tree.add(6);
tree.add(8);
tree.add(31);
tree.add(1);
tree.remove(6);
tree.remove(2);
console.log(tree.max());
console.log(tree);
