// function Table(col1, col2, col3, col4) {
//   this.col1 = col1;
//   this.col2 = col2;
//   this.col3 = col3;
//   this.col4 = col4;
// }

class Table {
  // Base constructor
  constructor(A, B, C, D, E, F, G, H, I, J) {
    this.A = A;
    this.B = B;
    this.C = C;
    this.D = D;
    this.E = E;
    this.F = F;
    this.G = G;
    this.H = H;
    this.I = I;
    this.J = J;
  }
  static draw() {
    console.table(board);
  }

  static hitted(col, row) {
    board[col][row] = '🔥';

    return console.table(board);
  }
}

let row0 = new Table(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
let row1 = new Table(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
let row2 = new Table(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
let row3 = new Table(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
let row4 = new Table(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
let row5 = new Table(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
let row6 = new Table(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
let row7 = new Table(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
let row8 = new Table(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
let row9 = new Table(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
let board = [row0, row1, row2, row3, row4, row5, row6, row7, row8, row9];
