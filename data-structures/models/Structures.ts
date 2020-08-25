import { LinkedListNode, BinaryTreeNode } from "./Nodes";

export class LinkedList {
    head: LinkedListNode;
    add(value: number): LinkedList {
        const newNode = new LinkedListNode(value);
        newNode.next = this.head;
        this.head = newNode;
        return this;
    }
    sum(): number {
        return this.head.sum();
    }
}

export class BinarySearchTree {
    private root: BinaryTreeNode;
    iterator: BinaryTreeNode;

    constructor(rootValue: number) {
        this.root = new BinaryTreeNode(rootValue);
        this.iterator = this.root;
    }
    
    add(value: number) {
        const newNode = new BinaryTreeNode(value);
        this.root.add(newNode);
    }
}