import React from "react";

/**
 * Компонент для отображения пагинации
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pageButtons = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
            <button
                key={i}
                onClick={() => onPageChange(i)}
                className={`page-btn ${currentPage === i ? 'active' : ''}`}
            >
                {i}
            </button>
        );
    }

    return (
        <div className="pagination">
            {currentPage > 1 && (
                <button
                    onClick={() => onPageChange(1)}
                    className="nav-btn"
                >
                    «
                </button>
            )}
            {startPage > 1 && <span>...</span>}
            {pageButtons}
            {endPage < totalPages && <span>...</span>}
            {currentPage < totalPages && (
                <button
                    onClick={() => onPageChange(totalPages)}
                    className="nav-btn"
                >
                    »
                </button>
            )}
        </div>
    );
};

export default Pagination; 