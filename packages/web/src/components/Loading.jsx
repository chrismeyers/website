import { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { getCssVar } from '../utils/styles';

const Loading = ({ lines = 5, header = false }) => {
  const [waiting, setWaiting] = useState(true);
  const loadingColor = getCssVar('--skeleton-color');
  const loadingHighlightColor = getCssVar('--skelton-highlight-color');

  useEffect(() => {
    const timeout = setTimeout(() => setWaiting(false), 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {waiting ? (
        <></>
      ) : (
        <SkeletonTheme
          color={loadingColor}
          highlightColor={loadingHighlightColor}
        >
          {header ? <Skeleton count={1} height={50} /> : <></>}
          <p>
            <Skeleton count={lines} />
          </p>
        </SkeletonTheme>
      )}
    </>
  );
};

export default Loading;
