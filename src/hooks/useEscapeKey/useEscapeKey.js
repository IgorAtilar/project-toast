import { useEffect } from 'react';

function useEscapeKey(callback = () => {}) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code !== 'Escape') return;

      callback();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback]);
}

export default useEscapeKey;
