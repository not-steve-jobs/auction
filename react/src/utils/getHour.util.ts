export const getHourFromAntdDate = (dateObject: any) => {
  const date = dateObject.$d;

  if (date instanceof Date) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  return null;
};
