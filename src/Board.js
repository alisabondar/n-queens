// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var nums = this.rows()[rowIndex];
      var sum = 0;
      nums.forEach(num => {sum += num})

      if (sum > 1) {
        return true;
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // for each row on board check for conflicts
      var result = false;
      for (var i = 0; i < this.attributes.n; i++) {
        result = this.hasRowConflictAt(i);
        if (result) {
          break;
        }
      }
      return result;
    },

    // console.log(this.rows()); returns board
    // console.log(this.rows()[0]); returns single row
    // console.log(this.rows()[0][0]); returns single value


    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // no columns available so need to create them with row indices
      // could just iterate through each rows[0-n][colIndex]
      var rows = this.rows();
      var columns = [];
      for (var i = 0; i < rows.length; i++) {
        columns.push(rows[i][colIndex]);
      }

      var sum = 0;
      columns.forEach(function(num) {
        sum += num;
      })
      if (sum > 1) {
        return true;
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // use attributes.n to represent number of rows
      var result = false;
      for (var i = 0; i < this.attributes.n; i++) {
        result = this.hasColConflictAt(i);
        if (result) {
          break;
        }
      }
      return result;
    },

      // var rows = this.rows();
      // var columns = [];
      // var col = 0;
      // var column = [];
      // for (var i = 0; i < rows.length; i++) {
      //   column.push(rows[i][col]);
      //   columns.push(column);
      //   col++;
      // }
      // var sums = [];
      // columns.forEach(function(item) {
      //   var sum = 0;
      //   for (var i = 0; i < item.length; i++) {
      //     sum += item[i];
      //   }
      //   sums.push(sum);
      // })
      // var answer = false
      // sums.forEach(function(num) {
      //   if (num !== 0) {
      //     answer = true;
      //   }
      // })
      // return answer;



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // go through matrix to find the queens, if queens have same index = conflict
      // calculate the sum of diagonal, if > 1 (how to account for negative param values)

      // iterate through each row -> if the value in the index is 1
      // keep track of value = 1
      // compare locations of queens (1)
      //_getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)
      var result = false;
      var rows = this.rows();
      var queens = 0;
      for (var i = 0; i < rows.length; i++) {
        // single row
        row = rows[i];
        for (var j = 0; j < row.length; j++) {
          // single num
          if (row[j] > 0) {
            var queenIndex = this._getFirstRowColumnIndexForMajorDiagonalOn(i, j);
            if (majorDiagonalColumnIndexAtFirstRow === queenIndex) {
              queens += 1;
              if (queens > 1) {
                result = true;
                break;
              }
            }
          }
        }
      }
      return result; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var result = false;
      for (var i = ((-1)*(this.attributes.n-1)); i < this.attributes.n; i++) {
        result = this.hasMajorDiagonalConflictAt(i);
        if (result) {
          break;
        }
      }
      return result;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var result = false;
      var rows = this.rows();
      var queens = 0;
      for (var i = 0; i < rows.length; i++) {
        // single row
        row = rows[i];
        for (var j = 0; j < row.length; j++) {
          // single num
          if (row[j] > 0) {
            var queenIndex = this._getFirstRowColumnIndexForMinorDiagonalOn(i, j);
            if (minorDiagonalColumnIndexAtFirstRow === queenIndex) {
              queens += 1;
              if (queens > 1) {
                result = true;
                break;
              }
            }
          }
        }
      }
      return result; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var result = false;
      // calculated length for when n is different
      for (var i = 0; i < ((2 * this.attributes.n) - 2); i++) {
        result = this.hasMinorDiagonalConflictAt(i);
        if (result) {
          break;
        }
      }
      return result;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
