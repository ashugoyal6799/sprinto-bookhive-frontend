export default function AuthorFilters({
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
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Search Authors
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Filter by Author Name"
          value={inputFilter.name}
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
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
