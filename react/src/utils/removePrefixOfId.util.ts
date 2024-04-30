export const removePrefixOfId = (arr: string[]) => {
  if (arr.includes("all")) {
    return ["all"];
  }
  return arr.map((item) => item.substring(2));
};
