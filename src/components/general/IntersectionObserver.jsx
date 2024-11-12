import { useEffect, useRef } from 'react';

const useIntersectionObserver = (callback, options) => {
  const observer = useRef();

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry.target);
        }
      });
    }, options);

    return () => {
      observer.current.disconnect();
    };
  }, [callback, options]);

  const observe = (element) => {
    if (element) {
      observer.current.observe(element);
    }
  };

  return observe;
};
export default useIntersectionObserver