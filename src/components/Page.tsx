import { ReactNode } from 'react';

interface Props {
  header: string;
  children: ReactNode;
  contentStyles?: string[];
}

const Page = ({ header, children, contentStyles = [] }: Props) => (
  <div className="content">
    <div className="section-header section-header-size">
      <div>{header}</div>
    </div>

    <div className={`content-text ${contentStyles.join(' ')}`}>{children}</div>
  </div>
);

export default Page;
