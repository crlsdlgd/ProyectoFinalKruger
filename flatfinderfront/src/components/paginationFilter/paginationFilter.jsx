import { Pagination } from "@heroui/react";
import { useEffect, useState } from "react";

export const PaginationFilter = ({ totalPages = 1, setPaginationFilter }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const paginationFilter = `&page=${currentPage}`;
    console.log("Pagination Filter changed:", paginationFilter);
    setPaginationFilter(paginationFilter);
  }, [currentPage]);

  return (
    <Pagination
      total={totalPages}
      currentPage={currentPage}
      initialPage={1}
      onChange={setCurrentPage}
    />
  );
};
