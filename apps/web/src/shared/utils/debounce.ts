/* eslint-disable @typescript-eslint/no-explicit-any */
const DEBOUNCE_TIME = 700;

const debounce = (func: (...args: any[]) => void, delay = DEBOUNCE_TIME) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export default debounce;
