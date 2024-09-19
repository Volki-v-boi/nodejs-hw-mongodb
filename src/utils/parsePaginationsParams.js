const parseInteger = (value, defaultValue) => {
  if (typeof value !== 'string') return defaultValue;

  const parsedValue = parseInt(value);

  if (Number.isNaN(parsedValue)) return defaultValue;

  return parsedValue;
};

const parsePaginationsParams = ({ perPage, page }) => {
  const parsedPerPage = parseInteger(perPage, 10);
  const parsedPage = parseInteger(page, 1);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};

export default parsePaginationsParams;
