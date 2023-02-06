import { useEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import io from 'socket.io-client';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import Modal from './Modal';
import TicTacToe from './games/TicTacToe';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Game from '../pages/Game';

const socket = io.connect('http://localhost:3001');

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [modal, setModal] = useState(null);

  const mainElement = useRef(null);

  const location = useLocation();

  const handleModalClose = () => {
    setModal(null);
  };

  const sendMessageToServer = () => {
    console.log('Send a message to the server');
    socket.emit('client_send_data', { content: 42 });
  }

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('server_send_data', (data) => {
      console.log(data);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('server_send_data');
    };
  }, []);

  return (
    <div className="App">
      {isConnected && (
        <button type="button" onClick={sendMessageToServer}>Connect</button>
      )}

      <Header target={mainElement} />

      <main className="main" ref={mainElement}>
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={(
                <Content>
                  <Home />
                </Content>
              )}
            />

            <Route
              path="/tic-tac-toe"
              element={(
                <Content>
                  <Game name="Tic Tac Toe">
                    <TicTacToe modal={modal} setModal={setModal} />
                  </Game>
                </Content>
              )}
            />

            <Route
              path="/other"
              element={(
                <Content>
                  <Game name="Other game">
                    <p>Do you want an other Game ?</p>
                  </Game>
                </Content>
              )}
            />

            <Route
              path="*"
              element={(
                <Content>
                  <NotFound />
                </Content>
              )}
            />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />

      {modal && (
        <Modal
          close={handleModalClose}
          {...modal}
        />
      )}
    </div>
  );
}

export default App;
