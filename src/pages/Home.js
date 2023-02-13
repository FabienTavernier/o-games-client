import { NavLink } from 'react-router-dom';

import tttScreenshot from '../assets/screenshots/tic-tac-toe.png';

function Home() {
  const games = [
    {
      name: 'Tic Tac Toe',
      slug: 'tic-tac-toe',
      description: 'Placing three of your marks in a horizontal, vertical, or diagonal row to win.',
      image: tttScreenshot,
    },
  ];

  return (
    <div className="home">
      <h2>Choose a game</h2>

      <div className="home-cards">
        {games.map(({ name, slug, description, image }) => (
          <NavLink key={slug} to={slug}>
            <article className="home-card">
              <img className="home-card__screenshot" src={image} alt={name} />

              <div className="home-card__content">
                <h3>{name}</h3>

                <p>{description}</p>
              </div>
            </article>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Home;
