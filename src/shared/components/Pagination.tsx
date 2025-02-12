import React from 'react';
import { usePagination, DOTS, paginationProps } from '@/shared/hooks/usePagination';
import { Pagination as ShadcnPagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

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
  const isLastPage = lastPage === currentPage
  return (
    <ShadcnPagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={onPrevious} />
          </PaginationItem>
        )}
        {paginationRange && paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return (
              <PaginationItem key={pageNumber}>
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
        {!isLastPage && (
          <PaginationItem>
            <PaginationNext onClick={onNext} />
          </PaginationItem>
        )}
      </PaginationContent>
    </ShadcnPagination>
  );
};

export default Pagination;
