import PropTypes from 'prop-types';

function Modal({ title, content, type, close }) {
  return (
    <div
      className={`modal modal--${type}`}
      onClick={close}
    >
      <div className="modal__overlay">
        <div className="modal__content">
          <h2>{title}</h2>

          {content}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node,
  type: PropTypes.string,
  close: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  content: null,
  type: 'default',
};

export default Modal;
