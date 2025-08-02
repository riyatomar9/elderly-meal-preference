import React from 'react';

interface LoadMoreProps {
  onLoadMore: () => void;
  hasMore: boolean;
  itemCount: number;
  totalCount: number;
}

export const LoadMore: React.FC<LoadMoreProps> = ({ onLoadMore, hasMore, itemCount, totalCount }) => {
  if (!hasMore) return null;

  return (
    <div className="mt-4 flex justify-center">
      <button
        onClick={onLoadMore}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-emerald-600 bg-white border border-emerald-300 rounded-md hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
      >
        Show More ({itemCount} of {totalCount})
        <svg
          className="ml-2 h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>
  );
};
