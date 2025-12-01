import { useMemo } from 'react';

const Pagination = ({
  currentPage = 1,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className = ''
}) => {
  const paginationRange = useMemo(() => {
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const leftRange = Array.from({ length: Math.min(leftSiblingIndex - 1, siblingCount + 1) }, (_, i) => i + 1);
    const rightRange = Array.from({ length: Math.min(totalPages - rightSiblingIndex, siblingCount + 1) }, (_, i) => rightSiblingIndex + i + 1);
    const middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i);

    let range = [...leftRange];
    if (shouldShowLeftDots) range.push('...');
    range.push(...middleRange);
    if (shouldShowRightDots) range.push('...');
    range.push(...rightRange);

    return range;
  }, [currentPage, totalPages, siblingCount]);

  const handlePageChange = (page) => {
    if (page !== '...' && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav aria-label="Pagination" className={`flex items-center justify-center gap-2 ${className}`}>
      {/* Previous Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="px-3 py-2 rounded-lg border border-secondary-300 text-secondary-700 hover:bg-secondary-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <i className="fas fa-chevron-left"></i>
      </button>

      {/* Page Numbers */}
      <div className="flex gap-1">
        {paginationRange.map((page, index) => (
          page === '...' ? (
            <span key={index} className="px-3 py-2 text-secondary-500">
              {page}
            </span>
          ) : (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={`
                px-3 py-2 rounded-lg font-medium transition-all
                ${currentPage === page
                  ? 'bg-primary-600 text-white'
                  : 'border border-secondary-300 text-secondary-700 hover:bg-secondary-100'
                }
              `}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          )
        ))}
      </div>

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-3 py-2 rounded-lg border border-secondary-300 text-secondary-700 hover:bg-secondary-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <i className="fas fa-chevron-right"></i>
      </button>
    </nav>
  );
};

export default Pagination;
