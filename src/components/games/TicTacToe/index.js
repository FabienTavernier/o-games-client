import { useState } from 'react';
import PropTypes from 'prop-types';

import Cell from './Cell';

function TicTacToe({ numberOfRows }) {
  const [board, setBoard] = useState(Array(numberOfRows * numberOfRows).fill(null));
  const [xTurn, setXTurn] = useState(true);
  const [hasWin, setHasWin] = useState(null);

  function handleCellClick(i) {
    if (board[i] || hasWin) {
      return;
    }

    const symbol = xTurn ? 'x' : 'o';

    const updatedBoard = [...board];
    updatedBoard[i] = symbol;

    setBoard(updatedBoard);

    if (detectWin(updatedBoard, i)) {
      setHasWin(symbol);
    }
    else {
      setXTurn(!xTurn);
    }
  }

  function getRows(number) {
    const rowsElements = [];

    for (let i = 0; i < number; i++) {
      rowsElements.push(
        <div key={`row${i}`} className="row">
          {getCells(number, i)}
        </div>
      );
    }

    return rowsElements;
  }

  function getCells(number, rowIndex) {
    const cellsElements = [];

    for (let i = 0; i < number; i++) {
      const cellIndex = rowIndex * number + i;

      cellsElements.push(
        <Cell
          key={`cell-${cellIndex}`}
          value={board[cellIndex]}
          onCellClick={() => handleCellClick(cellIndex)}
          size={100 / number}
        />
      );
    }

    return cellsElements;
  }

  function detectWin(board, cellIndex) {
    const symbol = board[cellIndex];

    // Check if an array contains only the same symbol
    const checkSymbols = (arr) => arr.every((cell) => cell && cell === symbol);

    // Check if the row contains only the same symbol
    const checkRow = (arr) => {
      // which row?
      const rowStart = parseInt(cellIndex / numberOfRows, 10) * numberOfRows;
      const rowEnd = rowStart + numberOfRows;
      const row = arr.slice(rowStart, rowEnd);

      // are the symbols the same?
      return checkSymbols(row);
    };

    // Check if the column contains only the same symbol
    const checkColumn = (arr) => {
      // get the modulo
      const modulo = cellIndex % numberOfRows;
      // get the column
      const column = arr.filter((_, index) => index % numberOfRows === modulo);

      // are the symbols the same?
      return checkSymbols(column);
    };

    // Check if the left to right diagonal contains only the same symbol
    const checkLeftDiagonal = (arr) => {
      // get the diagonal
      const diagonal = [];

      for (let i = 0; i < numberOfRows; i++) {
        diagonal.push(arr[i * (numberOfRows + 1)]);
      }

      // are the symbols the same?
      return checkSymbols(diagonal);
    };

    // Check if the right to left diagonal contains only the same symbol
    const checkRightDiagonal = (arr) => {
      // get the diagonal
      const diagonal = [];

      for (let i = 1; i < numberOfRows + 1; i++) {
        diagonal.push(arr[i * (numberOfRows - 1)]);
      }

      // are the symbols the same?
      return checkSymbols(diagonal);
    };

    return (
      checkRow(board)
      || checkColumn(board)
      || checkLeftDiagonal(board)
      || checkRightDiagonal(board)
    );
  }

  return (
    <div className="game tic-tac-toe container">
      <h2>Tic-Tac-Toe</h2>

      <div className="board">
        {getRows(numberOfRows)}
      </div>

      <div className="status">
        {hasWin && (
          <p>Player <strong>{hasWin}</strong> wins!</p>
        )}

        {!hasWin && (
          <p>Next player: {xTurn ? 'x' : 'o'}</p>
        )}
      </div>
    </div>
  );
}

TicTacToe.propTypes = {
  numberOfRows: PropTypes.number,
};

TicTacToe.defaultProps = {
  numberOfRows: 3,
};

export default TicTacToe;
