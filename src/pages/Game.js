import PropTypes from 'prop-types';

import { slugify } from '../utils';

function Game({ name, children }) {
  return (
    <div className={`${slugify(name)} game`}>
      <h2>{name}</h2>

      {children}
    </div>
  );
}

Game.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Game;
