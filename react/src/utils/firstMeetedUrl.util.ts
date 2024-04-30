export const findFirstImageUrl = (array: any[] | undefined) => {
  if (!array) {
    return;
  }
  for (let i = 0; i < array.length; i++) {
    if (array[i].type === "image") {
      return array[i].url;
    }
  }
  return null;
};
