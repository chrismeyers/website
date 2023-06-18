import PropTypes from 'prop-types';

const Page = ({ header, children, contentStyles }) => {
  return (
    <div className="content">
      <div className="section-header section-header-size">
        <div>{header}</div>
      </div>

      <div className={`content-text ${contentStyles.join(' ')}`}>
        {children}
      </div>
    </div>
  );
};

Page.defaultProps = {
  contentStyles: [],
};

Page.propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  contentStyles: PropTypes.arrayOf(PropTypes.string),
};

export default Page;
