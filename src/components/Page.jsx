const Page = ({ header, children, contentStyles = [] }) => (
  <div className="content">
    <div className="section-header section-header-size">
      <div>{header}</div>
    </div>

    <div className={`content-text ${contentStyles.join(' ')}`}>{children}</div>
  </div>
);

export default Page;
