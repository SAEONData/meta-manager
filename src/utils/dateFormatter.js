export const dateTimeFormat = (dateString) => {
  if(dateString === '' || dateString === undefined) return '';

  const date = new Date(dateString);
  return `${date.toLocaleDateString()} : ${date.toLocaleTimeString()}`
};
