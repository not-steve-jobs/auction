export const getLocalStoreItem = (name: string) => {
  if (typeof localStorage !== "undefined") {
    const ls = localStorage.getItem(name);
    return ls ? (typeof ls === "string" ? ls : JSON.parse(ls)) : null;
  }
  return null;
};

export const getSessionStoreItem = (name: string) => {
  if (typeof sessionStorage !== "undefined") {
    const ss = sessionStorage.getItem(name);
    return ss ? (typeof ss === "string" ? ss : JSON.parse(ss)) : null;
  }
  return null;
};
