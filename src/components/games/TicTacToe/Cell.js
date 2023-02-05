import PropTypes from 'prop-types';

function Cell({ value, onCellClick, size }) {
  return (
    <div
      className="square"
      style={{
        paddingBottom: `${size}%`,
        width: `${size}%`,
      }}
    >
      <button
        type="button"
        className="cell"
        onClick={onCellClick}
      >
        {value}
      </button>
    </div>
  );
}

Cell.propTypes = {
  value: PropTypes.node,
  onCellClick: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
};

Cell.defaultProps = {
  value: '',
};

export default Cell;
