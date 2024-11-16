// Utility to format timestamp to "dd/mm/yyyy"
export const formatToDDMMYYYY = (timestamp) => {
  const date = new Date(parseInt(timestamp, 10));
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Utility to format timestamp to "yyyy-mm-dd" for inputs
export const formatToYYYYMMDD = (timestamp) => {
  const date = new Date(parseInt(timestamp, 10));
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};
