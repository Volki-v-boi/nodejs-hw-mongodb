const calculatePaginationData = ({ totalContacts, page, perPage }) => {
  const totalPages = Math.ceil(totalContacts / perPage);
  const hasNextPage = page < totalPages;
  const hasPreviosPage = page !== 1;

  return { totalPages, hasNextPage, hasPreviosPage };
};

export default calculatePaginationData;
