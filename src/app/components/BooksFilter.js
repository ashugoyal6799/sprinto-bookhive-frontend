export default function Filters({
  inputFilter,
  setInputFilter,
  applyFilters,
  resetFilters,
}) {
  const handleFilterChange = (e) => {
    setInputFilter({ ...inputFilter, [e.target.name]: e.target.value });
  };

  return (
    <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Filter Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Filter by Title"
          value={inputFilter.title}
          onChange={handleFilterChange}
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          name="author_name"
          placeholder="Filter by Author Name"
          value={inputFilter.author_name}
          onChange={handleFilterChange}
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="date"
          name="published_date"
          placeholder="Filter by Date"
          value={inputFilter.published_date}
          onChange={handleFilterChange}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      <div className="flex justify-end gap-4 mt-4">
        <button
          onClick={resetFilters}
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
        >
          Reset Filters
        </button>
        <button
          onClick={applyFilters}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
