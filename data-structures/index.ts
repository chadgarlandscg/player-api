// import { BinarySearchTree } from "./models/Structures";

// const bst = new BinarySearchTree(5);
// bst.add(2);
// bst.add(4);
// bst.add(3);
// bst.add(6);

// console.log(bst);

// n x n Matrix -> n x n x 90 deg

// 1 2 
// 3 4 

// 1 2
// -->
// . 1
// . 2

// (0, 0) (0, 1)
// ---->
// (0, 1) (1, 1)

class SquareMatrix {
    constructor(private readonly matrix: number[][]) {
        if (!matrix.every(row => matrix.length === row.length)) {
            throw new Error("Matrix elements must be a square array.");
        }
    }

    rotate() {
        for (let i = 0; i < this.matrix.length; i++) {
            const opposingIndex = this.matrix.length - i;
            for (let j = opposingIndex - 1; j >= 0; j--) {
                const currentElement = this.matrix[i][j];
                const inverseElement = this.matrix[j][i];
                this.matrix[i][j] = inverseElement;
                this.matrix[j][i] = currentElement;
            }   
        }
        console.log(this.matrix);
        // this.matrix.forEach((row, i) => {
        //     row.forEach((element, j) => {
        //         tmp = element;
        //     });
        // });
    }
}

const matrix = [[1, 2], [3, 4]];
const ri = new SquareMatrix(matrix);
ri.rotate();