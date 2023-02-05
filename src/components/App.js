import { useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import Modal from './Modal';

import TicTacToe from './games/TicTacToe';

function App() {
  const [modal, setModal] = useState(null);

  const mainElement = useRef(null);

  const handleModalClose = () => {
    setModal(null);
  };

  return (
    <div className="App">
      <Header target={mainElement} />

      <main className="main" ref={mainElement}>
        <Content>
          <Routes>
            <Route path="/" element={<h2>Choose a game</h2>} />

            <Route
              path="/tic-tac-toe"
              element={(
                <TicTacToe modal={modal} setModal={setModal} />
              )}
            />

            <Route
              path="/other"
              element={<h2>Other game</h2>}
            />

            <Route path="*" element={<h2>404</h2>}  />
          </Routes>
        </Content>
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
