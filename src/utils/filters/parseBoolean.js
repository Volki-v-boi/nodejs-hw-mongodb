const parseBoolean = (value) => {
  if (typeof value !== 'string') return;

  const lowerCaseValue = value.toLowerCase();

  if (lowerCaseValue === 'true') return true;
  if (lowerCaseValue === 'false') return false;

  return;
};

export default parseBoolean;
