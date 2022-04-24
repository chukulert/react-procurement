//helper functions
export const calculateMaxPages = ({ arr, pageSize }) => {
  return Math.floor((arr.length + pageSize - 1) / pageSize);
};

export const paginateResults = ({ arr, pageSize, currentPage }) => {
  return arr.slice((currentPage - 1) * pageSize, currentPage * pageSize);
};

export const capitalizeString = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
