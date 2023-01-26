import PropTypes from 'prop-types';

const Page = ({ header, content, contentStyles }) => {
  return (
    <div className="content">
      <div className="section-header section-header-size">
        <div>{header}</div>
      </div>

      <div className={`content-text ${contentStyles.join(' ')}`}>{content}</div>
    </div>
  );
};

Page.defaultProps = {
  contentStyles: [],
};

Page.propTypes = {
  header: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  contentStyles: PropTypes.arrayOf(PropTypes.string),
};

export default Page;
