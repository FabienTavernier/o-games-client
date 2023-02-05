import { useState } from 'react';
import PropTypes from 'prop-types';

import Cell from './Cell';

function TicTacToe({ numberOfRows }) {
  const [board, setBoard] = useState(Array(numberOfRows * numberOfRows).fill(null));
  const [xTurn, toggleXTurn] = useState(true);

  function handleCellClick(i) {
    if (board[i]) {
      return;
    }

    const updatedBoard = [...board];
    updatedBoard[i] = xTurn ? 'x' : 'o';

    setBoard(updatedBoard);
    toggleXTurn(!xTurn);
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

  return (
    <div className="game tic-tac-toe container">
      <h2>Tic-Tac-Toe</h2>

      <div className="board">
        {getRows(numberOfRows)}
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
