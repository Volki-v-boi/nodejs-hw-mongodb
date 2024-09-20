const calculatePaginationData = ({ totalContacts, page, perPage }) => {
  const totalPages = Math.ceil(totalContacts / perPage);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page !== 1;

  return { totalPages, hasNextPage, hasPreviousPage };
};

export default calculatePaginationData;
