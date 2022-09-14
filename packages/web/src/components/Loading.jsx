import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { getCssVar } from '../utils/styles';

const Loading = ({ lines, header }) => {
  const [waiting, setWaiting] = useState(true);
  const loadingColor = getCssVar('--skeleton-color');
  const loadingHighlightColor = getCssVar('--skelton-highlight-color');

  useEffect(() => {
    const timeout = setTimeout(() => setWaiting(false), 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return waiting ? (
    <div />
  ) : (
    <SkeletonTheme
      baseColor={loadingColor}
      highlightColor={loadingHighlightColor}
    >
      {header ? <Skeleton count={1} height={50} /> : <div />}
      <p>
        <Skeleton count={lines} />
      </p>
    </SkeletonTheme>
  );
};

Loading.defaultProps = {
  lines: 5,
  header: false,
};

Loading.propTypes = {
  lines: PropTypes.number,
  header: PropTypes.bool,
};

export default Loading;
