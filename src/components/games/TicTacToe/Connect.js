import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Button from "../../Button";
import Icon from '../../ui/Icon';

import vars from '../../../stylesheets/abstracts/_variables.scss';

// DONE: share variant game in online mode
// TODO: save numberOfRows value in the local storage

function Connect({
  localGame,
  onlineGame,
  share,
  setShare,
  gameID,
  paramsGameID,
  numberOfRows,
  changeVariant,
}) {
  const [variant, setVariant] = useState(numberOfRows);
  const [shareLink, setShareLink] = useState(null);

  const onVariantClick = (value) => {
    setVariant(value);
    changeVariant(value);
  };

  useEffect(() => {
    setShareLink(`${window.location.href}?gameID=${gameID}&variant=${variant}`);
  }, [gameID, variant]);

  return (
    <div className="connect">
      <h3>Do you want to play?</h3>

      <div className="buttons buttons--narrow">
        <p>Variant:</p>

        {[3, 4, 5].map((value) => (
          <Button
            key={value}
            className="button button--secondary"
            action={() => { onVariantClick(value); }}
            disabled={variant === value}
          >
            {value} x {value}
          </Button>
        ))}
      </div>

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
                navigator.clipboard.writeText(shareLink);
              }}
              title={shareLink}
            >
              Share the game link
            </Button>

            {share && (
              <span
                className="connect-game__link"
                title={shareLink}
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
  numberOfRows: PropTypes.number.isRequired,
  changeVariant: PropTypes.func.isRequired,
};

Connect.defaultProps = {
  gameID: null,
  paramsGameID: null,
};

export default Connect;
