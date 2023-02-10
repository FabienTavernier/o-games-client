import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import Cell from './Cell';
import Button from '../../Button';

function Board({
  modal, setModal, numberOfRows, socket, gameID, playFirst,
}) {
  const getBoard = useCallback(() => {
    return Array(numberOfRows * numberOfRows).fill(null);
  }, [numberOfRows]);

  const [board, setBoard] = useState(getBoard());
  const [xTurn, setXTurn] = useState(true);
  const [myTurn, setMyTurn] = useState(playFirst);
  const [newMove, setNewMove] = useState(false);
  const [newGame, setNewGame] = useState(null);

  const restart = useCallback((symbol) => {
    if (socket) {
      socket.emit('restart', JSON.stringify({
        gameID,
        symbol,
      }));
    }
    else {
      setNewGame(symbol);
    }
  }, [gameID, socket]);

  const game = useMemo(() => ({
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
          restart(symbol);
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
          restart(symbol);
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
  }), [numberOfRows, restart, setModal]);

  const doMove = useCallback(({ cell, symbol }) => {
    const updatedBoard = [...board];
    updatedBoard[cell] = symbol;

    setBoard(updatedBoard);

    if (game.detectWin(updatedBoard, cell)) {
      game.declareWinner(symbol);
    }
    else {
      setXTurn(!xTurn);

      if (game.detectDraw(updatedBoard)) {
        game.declareDraw(symbol);
      }
    }

    setMyTurn(socket ? !myTurn : true);
    setNewMove(false);
  }, [board, game, myTurn, socket, xTurn]);

  function handleCellClick(cell) {
    if (board[cell] || modal || !myTurn) {
      console.log('CELL > click');
      console.log(board[cell], modal, !myTurn);
      return;
    }

    if (socket) {
      socket.emit('move', JSON.stringify({
        gameID,
        cell,
        symbol: xTurn ? 'x' : 'o',
      }));
    }
    else {
      doMove({
        cell,
        symbol: xTurn ? 'x' : 'o',
      });
    }
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

  useEffect(() => {
    if (socket) {
      socket.on('player_move', (move) => {
        setNewMove(JSON.parse(move));
      });

      socket.on('restart', (data) => {
        const { symbol } = JSON.parse(data);
        setNewGame(symbol);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (newMove) {
      doMove(newMove);
    }
  }, [doMove, newMove]);

  useEffect(() => {
    if (newGame) {
      setBoard(getBoard());
      setXTurn(newGame !== 'x');
      setModal(null);
    }
  }, [getBoard, newGame, setModal]);

  return (
    <>
      {!modal && (
        <div className="status">
          <p>Next player: {xTurn ? 'x' : 'o'}</p>
        </div>
      )}

      <div className="board">
        {drawBoard(numberOfRows)}
      </div>
    </>
  );
}

Board.propTypes = {
  modal: PropTypes.any,
  setModal: PropTypes.func.isRequired,
  numberOfRows: PropTypes.number.isRequired,
  socket: PropTypes.any.isRequired,
  gameID: PropTypes.string,
  playFirst: PropTypes.bool.isRequired,
};

Board.defaultProps = {
  modal: null,
  gameID: null,
};

export default Board;
