export class Node {
    constructor(public value?: number) {}
}

export class GraphNode extends Node {
    neighbors: GraphNode[];
}

export class LinkedListNode extends Node {
    next: LinkedListNode;
    sum(): number {
        if (this.next == null) {
            return this.value;
        }

        return this.value + this.next.sum();
    }
}

export class DoublyLinkedListNode extends LinkedListNode {
    next: DoublyLinkedListNode;
    prev: DoublyLinkedListNode;
}

export class TreeNode extends Node {
    children: TreeNode[];
}

export class UnaryTreeNode extends Node {
    child: UnaryTreeNode;
}

export class BinaryTreeNode extends Node {
    left: BinaryTreeNode;
    right: BinaryTreeNode;
    add(newNode: BinaryTreeNode): BinaryTreeNode {
        if (newNode.value < this.value) {
            if (this.left) this.left.add(newNode);
            else this.left = newNode;
        } else {
            if (this.right) this.right.add(newNode);
            else this.right = newNode;
        }
        return this;
    }
}

export class TrinaryTreeNode extends Node {
    left: TrinaryTreeNode;
    middle: TrinaryTreeNode;
    right: TrinaryTreeNode;
}