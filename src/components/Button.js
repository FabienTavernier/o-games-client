import PropTypes from 'prop-types';

function Button({ action, children, ...props }) {
  return (
    <button
      type="button"
      onClick={action}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  action: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
