import PropTypes from 'prop-types';

import Icon from './ui/Icon';

function Header({ target }) {
  const handleClickScroll = () => {
    target.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="header container">
      <h1>O'Games</h1>

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
