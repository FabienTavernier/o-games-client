import PropTypes from 'prop-types';

function Content({ children }) {
  return (
    <div className="main__content">
      {children}
    </div>
  );
}

Content.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Content;
