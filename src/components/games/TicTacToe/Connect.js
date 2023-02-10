import PropTypes from 'prop-types';

import Button from "../../Button";
import Icon from '../../ui/Icon';

import vars from '../../../stylesheets/abstracts/_variables.scss';

function Connect({
  localGame, onlineGame, share, setShare, gameID, paramsGameID,
}) {
  return (
    <div className="connect">
      <p>Do you want to play?</p>

      <div className="buttons">
        <Button
          className="button button--primary button--big"
          action={localGame}
        >
          In local mode
        </Button>

        {!gameID && (
          <Button
            className="button button--primary button--big"
            action={onlineGame}
          >
            {paramsGameID ? 'Join the game' : 'Online'}
          </Button>
        )}

        {gameID && (
          <div className="connect-game">
            <Button
              className="button button--secondary button--big"
              action={() => {
                setShare(!share);
                navigator.clipboard.writeText(`${window.location.href}?gameID=${gameID}`);
              }}
              title={`${window.location.href}?gameID=${gameID}`}
            >
              Share the game link
            </Button>

            {share && (
              <span
                className="connect-game__link"
                title={`${window.location.href}?gameID=${gameID}`}
              >
                <Icon
                  icon="checkmark"
                  color={vars.colorSuccess}
                  size="1em"
                />
                copied!
              </span>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

Connect.propTypes = {
  localGame: PropTypes.func.isRequired,
  onlineGame: PropTypes.func.isRequired,
  share: PropTypes.bool.isRequired,
  setShare: PropTypes.func.isRequired,
  gameID: PropTypes.string,
  paramsGameID: PropTypes.string,
};

Connect.defaultProps = {
  gameID: null,
  paramsGameID: null,
};

export default Connect;
