import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import socketIO from 'socket.io-client';

import Board from './Board';
import Connect from './Connect';

import { getRandomID } from '../../../utils';
import Button from '../../Button';

const SOCKET_SERVER = 'http://localhost:3001';

function TicTacToe({ modal, setModal, numberOfRows }) {
  const [socket, setSocket] = useState(null);
  const [gameID, setGameID] = useState(null);
  const [hasOpponent, setHasOpponent] = useState(false);
  const [share, setShare] = useState(false);
  const [playFirst, setPlayFirst] = useState(true);
  const [rejected, setRejected] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paramsGameID = params.get('gameID');

  const navigate = useNavigate();

  const setLocalGame = () => {
    setSocket(false);
    setHasOpponent(true);
  };

  const setOnlineGame = () => {
    const io = socketIO(SOCKET_SERVER);

    setSocket(io);
    setGameID(paramsGameID);
  };

  const chooseGame = () => {
    setSocket(null);
    setGameID(null);
    setHasOpponent(false);
    setShare(false);
    setPlayFirst(true);
    setRejected(false);
  };

  useEffect(() => {
    if (socket) {
      socket.on('player_join', (data) => {
        const { gameID, clientId } = JSON.parse(data);
        setHasOpponent(true);
        setShare(false);
        // save the given ID
        setGameID(gameID);

        if (socket.id === clientId) {
          // he is the 2nd player
          setPlayFirst(false);
        }
      });

      socket.on('player_reject', (clientId) => {
        console.log(socket);
        if (socket.id === clientId) {
          navigate(location.pathname);
          setRejected(true);
        }
      });
    }
  }, [location, navigate, socket]);

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
        setPlayFirst(true);
      }
      else {
        // it's the player 2
        // tell the server he joins the game
        socket.emit('join', paramsGameID);
      }
    }
  }, [socket, paramsGameID]);

  return (
    <>
      {rejected && (
        <>
          <p>Do you want to create a game?</p>
          <p>
            <em>No thanks, send me to the </em>
            <Link to="/"><em>Homepage</em></Link>
          </p>

          <div className="buttons">
            <Button
              className="button button--primary button--center button--big"
              action={chooseGame}
            >
              Yes, I want my game
            </Button>
          </div>
        </>
      )}

      {!rejected && (
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
              socket={socket}
              gameID={gameID}
              playFirst={playFirst}
            />
          )}
        </>
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
