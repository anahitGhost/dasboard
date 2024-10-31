import { useCallback, useLayoutEffect, useRef } from 'react';

function useEventCallback(fn, deps = []) {
  const ref = useRef();
  useLayoutEffect(() => {
    ref.current = fn;
  });
  return useCallback((...args) => (0, ref.current)(...args), deps);
}

export default useEventCallback;
