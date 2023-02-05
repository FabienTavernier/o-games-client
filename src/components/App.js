import { useRef, useState } from 'react';

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
          <TicTacToe modal={modal} setModal={setModal} />
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
