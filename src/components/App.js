import { useRef } from 'react';
import Footer from './Footer';

import Header from './Header';

function App() {
  const mainElement = useRef(null);

  return (
    <div className="App">
      <Header target={mainElement} />

      <main className="main" ref={mainElement}>
        <div className="main__content">
          <div className="container">
            <h2>
              stop dreaming and code
            </h2>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
