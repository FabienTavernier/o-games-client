import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import socketIO from 'socket.io-client';

import Board from './Board';
import Connect from './Connect';

import { getRandomID } from '../../../utils';

const SOCKET_SERVER = 'http://localhost:3001';

function TicTacToe({ modal, setModal, numberOfRows }) {
  const [socket, setSocket] = useState(null);
  const [gameID, setGameID] = useState(null);
  const [hasOpponent, setHasOpponent] = useState(false);
  const [share, setShare] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paramsGameID = params.get('gameID');

  const setLocalGame = () => {
    setSocket(false);
    setHasOpponent(true);
  };

  const setOnlineGame = () => {
    const io = socketIO(SOCKET_SERVER);

    setSocket(io);
    setGameID(paramsGameID);
  };

  useEffect(() => {
    if (socket) {
      socket.on('player_join', () => {
        setHasOpponent(true);
        setShare(false);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      if (!paramsGameID) {
        // it's the player 1
        // get a game ID
        const newGameID = getRandomID();
        // tell the server we have a new game
        socket.emit('create', newGameID);
        // save the generated ID
        setGameID(newGameID);
      }
      else {
        // it's the player 2
        // tell the server he joins the game
        socket.emit('join', paramsGameID);
        // save the given ID
        setGameID(paramsGameID);
      }
    }
  }, [socket, paramsGameID]);

  return (
    <>
      {(socket === null || !hasOpponent) && (
        <Connect
          localGame={setLocalGame}
          onlineGame={setOnlineGame}
          share={share}
          setShare={setShare}
          gameID={gameID}
          paramsGameID={paramsGameID}
        />
      )}

      {socket !== null && hasOpponent && (
        <Board
          modal={modal}
          setModal={setModal}
          numberOfRows={numberOfRows}
        />
      )}
    </>
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
