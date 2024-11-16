export default function Pagination({
  offset,
  limit,
  totalCount,
  handlePreviousPage,
  handleNextPage,
}) {
  return (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={handlePreviousPage}
        disabled={offset === 0}
        className={`py-2 px-4 rounded-lg ${
          offset === 0 ? "bg-gray-300 text-gray-500" : "bg-blue-500 text-white"
        }`}
      >
        Previous
      </button>
      <span className="text-gray-700">
        Page {Math.ceil(offset / limit) + 1} of{" "}
        {Math.ceil(totalCount / limit) || 1}
      </span>
      <button
        onClick={handleNextPage}
        disabled={offset + limit >= totalCount}
        className={`py-2 px-4 rounded-lg ${
          offset + limit >= totalCount
            ? "bg-gray-300 text-gray-500"
            : "bg-blue-500 text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
}
