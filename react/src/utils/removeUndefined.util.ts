export const removeUndefined = (obj: any) => {
  if (Array.isArray(obj)) {
    for (let i = obj.length - 1; i >= 0; i--) {
      if (obj[i] === undefined) {
        obj.splice(i, 1);
      } else if (typeof obj[i] === "object") {
        removeUndefined(obj[i]);
        if (Object.keys(obj[i]).length === 0) {
          obj.splice(i, 1);
        }
      }
    }
  } else if (typeof obj === "object" && obj !== null) {
    for (const key in obj) {
      if (obj[key] === undefined) {
        delete obj[key];
      } else if (typeof obj[key] === "object") {
        removeUndefined(obj[key]);
        if (Object.keys(obj[key]).length === 0) {
          delete obj[key];
        }
      }
    }
  }
  return obj;
};
