import PropTypes from 'prop-types';

function Cell({ value, size }) {
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
      >
        {value}
      </button>
    </div>
  );
}

Cell.propTypes = {
  value: PropTypes.node,
  size: PropTypes.number.isRequired,
};

Cell.defaultProps = {
  value: '',
};

export default Cell;
