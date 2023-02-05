import { useState } from 'react';
import PropTypes from 'prop-types';

import Cell from './Cell';
import Button from '../../Button';

function TicTacToe({ modal, setModal, numberOfRows }) {
  const [board, setBoard] = useState(getBoard());
  const [xTurn, setXTurn] = useState(true);

  function handleCellClick(i) {
    if (board[i] || modal) {
      return;
    }

    const symbol = xTurn ? 'x' : 'o';

    const updatedBoard = [...board];
    updatedBoard[i] = symbol;

    setBoard(updatedBoard);

    if (game.detectWin(updatedBoard, i)) {
      game.declareWinner(symbol);
    }
    else {
      setXTurn(!xTurn);

      if (game.detectDraw(updatedBoard)) {
        game.declareDraw(symbol);
      }
    }
  }

  function getBoard() {
    return Array(numberOfRows * numberOfRows).fill(null);
  }

  function drawBoard(number) {
    const rowsElements = [];

    for (let i = 0; i < number; i++) {
      rowsElements.push(
        <div key={`row${i}`} className="row">
          {drawCells(number, i)}
        </div>
      );
    }

    function drawCells(number, rowIndex) {
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

    return rowsElements;
  }

  const game = {
    start(symbol) {
      setBoard(getBoard());
      setXTurn(symbol !== 'x');
    },

    detectWin(board, cellIndex) {
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
    },

    declareWinner(symbol) {
      function getModalContent() {
        const looser = symbol === 'x' ? 'o' : 'x';

        const handleClick = () => {
          game.start(symbol);
        };

        return (
          <>
            <p>{looser.toUpperCase()}, it's time to take your revenge…</p>

            <div>
              <Button
                className="button button--primary button--center"
                action={handleClick}
              >
                Let's fight
              </Button>
            </div>
          </>
        );
      }

      setModal({
        title: `${symbol.toUpperCase()} wins!`,
        content: getModalContent(),
        type: 'success',
      });
    },

    detectDraw(board) {
      return board.filter((cell) => cell !== null).length === board.length;
    },

    declareDraw(symbol) {
      function getModalContent() {
        const handleClick = () => {
          game.start(symbol);
        };

        return (
          <>
            <p>Are you ready for another fight?</p>

            <div>
              <Button
                className="button button--primary button--center"
                action={handleClick}
              >
                Let's go
              </Button>
            </div>
          </>
        );
      }

      setModal({
        title: `It's a draw!`,
        content: getModalContent(),
        type: 'warning',
      });
    }
  };

  return (
    <div className="game tic-tac-toe container">
      <h2>Tic-Tac-Toe</h2>

      {!modal && (
        <div className="status">
          <p>Next player: {xTurn ? 'x' : 'o'}</p>
        </div>
      )}

      <div className="board">
        {drawBoard(numberOfRows)}
      </div>
    </div>
  );
}

TicTacToe.propTypes = {
  modal: PropTypes.any,
  setModal: PropTypes.func.isRequired,
  numberOfRows: PropTypes.number,
};

TicTacToe.defaultProps = {
  modal: null,
  numberOfRows: 3,
};

export default TicTacToe;
