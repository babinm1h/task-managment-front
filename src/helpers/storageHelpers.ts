export const storageSetItem = <T>(name: string, item: T) => {
  localStorage.setItem(name, JSON.stringify(item));
};

export const storageGetItem = <T>(name: string): T | null => {
  const item = localStorage.getItem(name);
  return item ? JSON.parse(item) : null;
};
