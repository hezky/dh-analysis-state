const makeIterator = () => {
  let index = 0;
  return {
    next: () => index++,
    value: () => `${index}`,
  };
};

export default makeIterator;
