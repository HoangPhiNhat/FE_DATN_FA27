const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const renderPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5; // Số trang hiển thị tối đa

      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      // Điều chỉnh lại startPage nếu endPage đã chạm giới hạn
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

    // Thêm nút trang đầu
    if (startPage > 1) {
      pages.push(
        <button
            key={1}
            onClick={() => onPageChange(1)}
            className="px-3 py-1 mx-1 rounded hover:bg-gray-200"
          >
            1
          </button>
        );
        if (startPage > 2) {
          pages.push(
            <span key="start-ellipsis" className="px-2">
              ...
            </span>
          );
        }
      }

      // Thêm các nút trang giữa
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`px-3 py-1 mx-1 rounded ${
              currentPage === i
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            {i}
          </button>
        );
      }

      // Thêm nút trang cuối
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push(
            <span key="end-ellipsis" className="px-2">
              ...
            </span>
          );
        }
        pages.push(
          <button
            key={totalPages}
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-1 mx-1 rounded hover:bg-gray-200"
          >
            {totalPages}
          </button>
        );
      }

      return pages;
    };

    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-center space-x-2 my-4">
        {/* Nút Previous */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Trước
        </button>

        {/* Các nút số trang */}
        <div className="flex items-center">{renderPageNumbers()}</div>

        {/* Nút Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Sau
        </button>
      </div>
    );
  };

  export default Pagination;