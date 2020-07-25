import { useEffect, useRef } from 'react';

const useDidMount = (func) => {
  return useEffect(() => {
    func();
  }, []);
};

const mounted = useRef();
const useDidUpdate = (func) => {
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      func();
    }
  });
};

const useDidUnMount = (func) => {
  useEffect(() => {
    return func;
  }, []);
};

export { useDidMount, useDidUpdate, useDidUnMount };
