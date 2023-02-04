import { useRef } from 'react';

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

      <footer className="footer">
        <p>© {(new Date()).getFullYear()} – O'Clock</p>
      </footer>
    </div>
  );
}

export default App;
