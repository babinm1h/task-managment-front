export const getPercent = (num: number, total: number) => {
  const percent = (100 * num) / total;
  return `${Math.round(percent) || 0}%`;
};
