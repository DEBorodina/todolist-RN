const numberOfColors = 16777215;

export const getRandomColor = () => {
  let randomColor = Math.floor(Math.random() * numberOfColors)
    .toString(16)
    .padStart(6, '0');
  return `#${randomColor}`;
};
