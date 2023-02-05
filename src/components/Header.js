import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Icon from './ui/Icon';

function Header({ target }) {
  const handleClickScroll = () => {
    target.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="header container">
      <h1>
        <Link to="/">O'Games</Link>
      </h1>

      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink to="/tic-tac-toe" className="nav__link">Tic-Tac-Toe</NavLink>
          </li>
          <li className="nav__item">
            <NavLink to="/other" className="nav__link">Other</NavLink>
          </li>
        </ul>
      </nav>

      <div className="header__scroll small-only" id="headerScroll">
        <Icon
          icon="circle-down"
          size="1em"
          onClick={handleClickScroll}
        />
      </div>
    </header>
  );
}

Header.propTypes = {
  target: PropTypes.object.isRequired,
};

export default Header;
