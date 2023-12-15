import { useEffect } from 'react';

function useListenToKeyDown(key = '', callback = () => {}) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code !== key) return;

      callback();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback, key]);
}

export default useListenToKeyDown;
