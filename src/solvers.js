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

window.findSolution = function(row, n, board, callback) {
  if (row === n) {
    callback();
    return;
  }
  for (var i = 0; i < n; i++) {
    board.togglePiece(row, i);

    if (!board.hasAnyQueensConflicts()) {
      findSolution(row+1, n, board, callback);
    }
    board.togglePiece(row, i);
  }
};

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
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;

};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) { // solutionCount = 6 when n = 4
  // var expectedSolutionCount = [1, 1, 2, 6, 24, 120, 720, 5040, 40320][n 1-8];
  // keep track of true solutions
  // solve with factorial matrices

  if (n === 1) {
    return n;
  }
  var solutionCount = n*window.countNRooksSolutions(n-1);



  // for each board - outer nest - nxn
  // inner loop would terminate and counter++ and set the board to 0

  // var x = n;
  // var answer = [];
  // var board = new Board({n:x})
  // var mat = board.attributes;
  // // console.log(this.displayBoard.findNRooksSolution(1));
  // // console.log(mat.hasRowConflictAt(2));
  // // could store each board

  // for (var i = 0; i < n**2; i++) {
  //   for (var j = 0; j < n; j++) {
  //     for (var k = 0; k < n; k++) {
  //       mat[j][k] = 1;
  //       if (board.hasRowConflictAt(j)) {
  //         mat[j][k] = 0;
  //       }
  //       if (board.hasColConflictAt(k)) {
  //         mat[j][k] = 0;
  //       }
  //     }
  //   }
  //   if (!board.hasAnyColConflicts && !board.hasAnyRowConflicts) {
  //     solutionCount += 1;
  //     answer.push(board);
  //     console.log(mat);
  //   }
  //   // console.log('a', answer);
  //   // console.log(solutionCount);
  //   board = new Board({n:x});
  // }

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = []; //fixme
  var board = new Board({n:n});
  var mat = board.attributes;

  for (var i = 0; i < n**2; i++) {
    var row = Math.floor(i / n);
    var col = i % n;
    var queens = 0;
    // initialize first queen
    mat[row][col] = 1;
    for (var j = 0; j < n; j++) {
      for (var k = 0; k < n; k++) {
        // initialize second queen and check against conflicts
        mat[j][k] = 1;
        if (board.hasRowConflictAt(j)) {
          mat[j][k] = 0;
        }
        if (board.hasColConflictAt(k)) {
          mat[j][k] = 0;
        }
        if (board.hasMinorDiagonalConflictAt(k+j)) {
          mat[j][k] = 0;
        }
        if (board.hasMajorDiagonalConflictAt(k-j)) {
          mat[j][k] = 0;
        }
        if (mat[j][k] === 1) {
          queens += 1;
        }
      }
    }
    if (!board.hasAnyColConflicts() && !board.hasAnyRowConflicts() && !board.hasAnyMajorDiagonalConflicts() && !board.hasAnyMinorDiagonalConflicts() && queens === n) {
      for (index = 0; index < n; index++) {
        solution.push(mat[index]);
      }
      break;
    }
    // console.log('a', answer);
    // console.log(solutionCount);
    board = new Board({n:n});
    mat = board.attributes;
  }
  if (solution.length === 0) {
    board = new Board({n:n});
    mat = board.attributes;
    for (index = 0; index < n; index++) {
      solution.push(mat[index]);
    }
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCounter = 0;
  var board = new Board({n:n});

  findSolution(0, n, board, function() {
    solutionCounter++;
  });

  console.log('Number of solutions for ' + n + ' queens:', solutionCounter);
  return solutionCounter;
};

  // var sol = [];

  // //copies matrix into form of array of arrays
  // function boardArray(n) {
  //   var board = new Board({n:n});
  //   var mat = board.attributes;
  //   var matrix = [];
  //   for (var i = 0; i < n; i++) {
  //     matrix[i] = [];
  //     for (var j = 0; j < n; j++) {
  //       matrix[i][j] = 0;
  //     }
  //   }
  //   return matrix;
  // }

  // function recurse(board, col) {
  //   if (col === n) {
  //     var queens = 0;
  //     for (var row = 0; row < n; row++) {
  //       for (var col = 0; col < n; col++) {
  //         // console.log(board[row][col])
  //         if (board[row][col] === 1) {
  //           console.log(row, col);
  //           queens += 1;
  //         }
  //       }
  //     }
  //     if (queens === n) {
  //       sol.push(board);
  //     }
  //     return;
  //   }
  //   for (var i = 0; i < n; i++) {
  //     // if no conflicts
  //     if (check(board)) {
  //       board[i][col] = 1;
  //     // recurse to check next column
  //       recurse(board, col + 1);
  //       board[i][col] = 0;
  //     }
  //   }
  //   return false;
  // }

  // //returns true if there are intesections, false if no intersections
  // function check(matrix) {
  //   var board = new Board({n:n});
  //   var mat = board.attributes;
  //   for (var i = 0; i < n; i++) {
  //     mat[i] = matrix[i];
  //   }
  //   return (!board.hasAnyColConflicts() && !board.hasAnyRowConflicts() && !board.hasAnyMinorDiagonalConflicts() && !board.hasAnyMajorDiagonalConflicts());
  // }

  // var board = boardArray(n);
  // recurse(board, 0);
  // solutionCount = sol.length;
  // if (n === 0) {
  //   solutionCount = 1;
  // }