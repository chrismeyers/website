import PropTypes from 'prop-types';

const ToastMessage = ({ title, message }) => {
  return (
    <>
      <b>{title}</b>
      <div>{message}</div>
    </>
  );
};

ToastMessage.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default ToastMessage;
