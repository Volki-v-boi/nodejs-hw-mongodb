const parseInteger = (value, defaultValue) => {
  if (typeof value !== 'string') {
    return defaultValue;
  }
  const parsedValue = parseInt(value);

  if (Number.isNaN(parsedValue)) return defaultValue;

  return parsedValue;
};

const parsePaginationsParams = (page, perPage) => {
  const parsedPage = parseInteger(page, 1);
  const parsedPerPage = parseInteger(perPage, 10);

  return {
    pege: parsedPage,
    perPage: parsedPerPage,
  };
};

export default parsePaginationsParams;
