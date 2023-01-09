import PropTypes from 'prop-types';

const Page = ({ title, content, contentStyles }) => {
  return (
    <div className="content">
      <div className="section-header section-header-size">
        <div>{title}</div>
      </div>

      <div className={`content-text ${contentStyles.join(' ')}`}>{content}</div>
    </div>
  );
};

Page.defaultProps = {
  contentStyles: [],
};

Page.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  contentStyles: PropTypes.arrayOf(PropTypes.string),
};

export default Page;
