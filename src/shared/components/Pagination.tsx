import React from 'react';
import { usePagination, DOTS, paginationProps } from '@/shared/hooks/usePagination';
import { Pagination as ShadPagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const Pagination = (props: paginationProps) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  const onNext = () => {
    if (onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (onPageChange) {
      onPageChange(currentPage - 1);
    }
  };
  const lastPage = paginationRange && paginationRange[paginationRange.length - 1];

  return (
    <ShadPagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={onPrevious} />
          </PaginationItem>
        )}
        {paginationRange && paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink onClick={() => { if (onPageChange) onPageChange(pageNumber); }}>{pageNumber}</PaginationLink>
            </PaginationItem>
          );
        })}
        {!lastPage && (
          <PaginationItem>
            <PaginationNext onClick={onNext} />
          </PaginationItem>
        )}
      </PaginationContent>
    </ShadPagination>
  );
};

export default Pagination;
