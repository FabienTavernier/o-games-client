import { useRef } from 'react';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

import TicTacToe from './games/TicTacToe';

function App() {
  const mainElement = useRef(null);

  return (
    <div className="App">
      <Header target={mainElement} />

      <main className="main" ref={mainElement}>
        <Content>
          <TicTacToe />
        </Content>
      </main>

      <Footer />
    </div>
  );
}

export default App;
