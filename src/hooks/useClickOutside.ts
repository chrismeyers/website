import { MutableRefObject, useEffect } from 'react';

// Adapted from: https://stackoverflow.com/a/42234988
const useClickOutside = (
  ref: MutableRefObject<HTMLElement | null>,
  cb: () => void,
  ignoreRefs: MutableRefObject<HTMLElement | null>[] = []
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        let ignore = false;
        ignoreRefs.forEach((item) => {
          if (item?.current?.contains(event.target as Node)) {
            ignore = true;
          }
        });

        if (!ignore) cb();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, cb, ignoreRefs]);
};

export default useClickOutside;
