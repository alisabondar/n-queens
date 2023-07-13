/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = []; //fixme
  // var x = this.Board(makeEmptyMatrix(n));
  // console.log(Board(n));

  // nested for loop
  // if i = j -> place a rook
  for (var i = 0; i < n; i++) {
    var row = [];
    for (var j = 0; j < n; j++) {
      if (i === j) {
        row.push(1);
      } else {
        row.push(0);
      }
    }
    solution.push(row);
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;

};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) { // solutionCount = 6 when n = 4
  // var expectedSolutionCount = [1, 1, 2, 6, 24, 120, 720, 5040, 40320][n 1-8];
  var solutionCount = 0; //fixme
  // keep track of true solutions
  // for each board - outer nest - nxn
  // inner loop would terminate and counter++ and set the board to 0

  // var matrix = [];
  // for (var i = 0; i < n; i++) {
  //   var row = [];
  //   for (var j = 0; j < n; j++) {
  //     row.push(0)
  //   }
  //   matrix.push(row);
  // }
  var x = n;
  var answer = [];
  var board = new Board({n:x})
  var mat = board.attributes;
  // console.log(this.displayBoard.findNRooksSolution(1));
  // console.log(mat.hasRowConflictAt(2));
  // could store each board

  for (var i = 0; i < n**2; i++) {
    for (var j = 0; j < n; j++) {
      for (var k = 0; k < n; k++) {
        mat[j][k] = 1;
        if (board.hasRowConflictAt(j)) {
          mat[j][k] = 0;
        }
        if (board.hasColConflictAt(k)) {
          mat[j][k] = 0;
          console.log(board);
        }
      }
    }
    if (!board.hasAnyColConflicts && !board.hasAnyRowConflicts) {
      solutionCount += 1;
      answer.push(board);
    }
    console.log('a', answer);
    console.log(solutionCount);
    board = new Board({n:x});
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = []; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
