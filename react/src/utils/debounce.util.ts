// eslint-disable-next-line no-unused-vars
export const debounce = <T extends unknown[]>(func: (...args: T) => void, delay: number) => {
  // eslint-disable-next-line no-undef
  let timerId: NodeJS.Timeout;
  return (...args: T) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
