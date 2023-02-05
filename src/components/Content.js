import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

function Content({ children }) {
  const duration = 0.6;

  const flipVariant = {
    start: {
      rotateY: 180,
      transition: {
        ease: 'easeInOut',
        duration,
      },
    },
    end: {
      rotateY: 0,
      transition: {
        ease: 'easeInOut',
        duration,
      },
    },
  };

  const opacityVariant = {
    start: {
      opacity: 0,
      transition: {
        ease: 'easeInOut',
        duration: duration * 1.5,
        opacity: {
          delay: duration,
        }
      },
    },
    end: {
      opacity: 1,
      transition: {
        ease: 'easeInOut',
        duration: duration * 1.5,
        opacity: {
          delay: duration,
        }
      },
    },
  };

  return (
    <motion.div
      className="main__content"
      variants={flipVariant}
      initial="start"
      animate="end"
    >
      <motion.div
        className="container"
        variants={opacityVariant}
        initial="start"
        animate="end"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

Content.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Content;
