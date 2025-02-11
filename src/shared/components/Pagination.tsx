import React from 'react';
import { usePagination, DOTS, paginationProps } from '@/shared/hooks/usePagination';

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

  // const lastPage = paginationRange && paginationRange[paginationRange.length - 1];

  return (
    <div className={'gap-1 justify-center mt-10'}>
      <button
        className={'bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-3xl text-white'}
        onClick={onPrevious}>
        {'<'}
      </button>

      {paginationRange && paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return (<button>&#8230;</button>);
        }
        return (
          <button
            key={pageNumber}
            className={'bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-3xl text-white'}
            onClick={() => { if (onPageChange) onPageChange(pageNumber); }}>
            {pageNumber}
          </button>
        );
      })}

      <button
        className={'bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-3xl text-white'}
        onClick={onNext}>
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
