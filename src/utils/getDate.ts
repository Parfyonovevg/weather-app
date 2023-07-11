export const getDate = (date: Date) => {
  const nameOfCurrentMonth = date.toLocaleString('default', {
    month: 'long',
  });

  const numberOfCurrentDay = date.getDate();

  const nameOfCurrentDay = date.toLocaleString('default', {
    weekday: 'long',
  });

  const currentYear = date.getFullYear();

  return `${nameOfCurrentDay} ${numberOfCurrentDay} ${nameOfCurrentMonth} ${currentYear}`;
};
