function App() {
  return (
    <div className="App">
      <header className="header container">
        <h1>It's up to you!</h1>
      </header>

      <main className="main">
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
