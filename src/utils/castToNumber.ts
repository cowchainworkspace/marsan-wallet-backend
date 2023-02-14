export const castToNumber = <T>(value: T, defaultReturn: number = 0) => {
  const result = isNaN(+value) ? defaultReturn : +value;
  return result;
};
