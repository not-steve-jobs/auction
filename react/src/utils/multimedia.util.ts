// eslint-disable-next-line no-undef
const UPLOAD_URL = process.env.REACT_APP_PAGE_URL;

export const getMultimedia = (path: string) => {
  const replacedPath = path.replace("diskStorage", "storage");
  return `${UPLOAD_URL}${replacedPath}`;
};
