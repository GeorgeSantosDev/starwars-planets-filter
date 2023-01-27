const separateArrayNumbers = (array, order) => (
  array.filter((planet) => planet[order.column] !== 'unknown')
);

const separateArrayUnknowns = (array, order) => (
  array.filter((planet) => planet[order.column] === 'unknown')
);

export default (array, order) => {
  const kindOfSort = {
    ASC: () => {
      const numbers = separateArrayNumbers(array, order);
      const unknowns = separateArrayUnknowns(array, order);
      const ordenatedArray = numbers
        .sort((a, b) => Number(a[order.column]) - Number(b[order.column]));
      return [...ordenatedArray, ...unknowns];
    },
    DESC: () => {
      const numbers = separateArrayNumbers(array, order);
      const unknowns = separateArrayUnknowns(array, order);
      const ordenatedArray = numbers
        .sort((a, b) => Number(b[order.column]) - Number(a[order.column]));
      return [...ordenatedArray, ...unknowns];
    },
  };

  return order.sort ? kindOfSort[order.sort] : array;
};
