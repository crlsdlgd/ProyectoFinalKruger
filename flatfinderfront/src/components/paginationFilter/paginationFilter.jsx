import { Pagination } from "@heroui/react";

export const PaginationFilter = ({
  totalPages = 1,
  setPaginationFilter,
  currentPage,
  setCurrentPage,
}) => {
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setPaginationFilter(`&page=${page}`);
  };

  return (
    <Pagination
      total={totalPages}
      currentPage={currentPage}
      initialPage={1}
      onChange={handlePageChange}
    />
  );
};
