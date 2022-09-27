import { useEffect } from 'react';

// Adapted from https://stackoverflow.com/a/42234988
const useClickOutside = (ref, cb, ignoreRefs = []) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        let ignore = false;
        ignoreRefs.forEach((item) => {
          if (item.current.contains(event.target)) {
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
