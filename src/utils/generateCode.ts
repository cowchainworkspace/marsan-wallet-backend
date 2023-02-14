export const generateCode = (codeLength: number = 5) => {
  const result = [];

  for (let i = 0; i < codeLength; i++) {
    const num = Math.floor(Math.random() * 10);
    result.push(num);
  }

  return result.join("");
};
