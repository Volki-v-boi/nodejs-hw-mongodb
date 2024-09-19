import parseBoolean from './parseBoolean.js';

const parseContactFilterParams = (isFavourite) => {
  const parsedIsFavourite = parseBoolean(isFavourite);

  if (parsedIsFavourite === undefined) {
    return "Please enter 'true' or 'false'";
  }

  return parsedIsFavourite;
};

export default parseContactFilterParams;
