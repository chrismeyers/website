import { useEffect, type ReactNode } from 'react';
import { SLOGAN } from '../constants.ts';

interface Metadata {
  header: string;
  title?: string;
}

interface Props {
  metadata: Metadata;
  children: ReactNode;
  contentStyles?: string[];
}

const Page = ({ metadata, children, contentStyles = [] }: Props) => {
  useEffect(() => {
    const title = metadata.title ? `${metadata.title} | ${SLOGAN}` : SLOGAN;
    document.title = title;
  }, [metadata.title]);

  return (
    <div className="content">
      <div className="section-header section-header-size">
        <div>{metadata.header}</div>
      </div>

      <div className={`content-text ${contentStyles.join(' ')}`}>
        {children}
      </div>
    </div>
  );
};

export default Page;
