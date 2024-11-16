import { formatToDDMMYYYY } from "../utils/formateDate";

export default function AuthorCard({
  author,
  editingAuthor,
  setEditingAuthor,
  handleDelete,
  handleEdit,
  handleUpdate,
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
      {editingAuthor?.id === author.id ? (
        <>
          <input
            type="text"
            value={editingAuthor.name}
            onChange={(e) =>
              setEditingAuthor({ ...editingAuthor, name: e.target.value })
            }
            className="w-full mb-2 p-2 border rounded-md"
            placeholder="Edit name"
          />
          <textarea
            value={editingAuthor.biography}
            onChange={(e) =>
              setEditingAuthor({
                ...editingAuthor,
                biography: e.target.value,
              })
            }
            className="w-full mb-2 p-2 border rounded-md"
            placeholder="Edit biography"
          />
          <input
            type="date"
            value={editingAuthor.born_date || ""}
            onChange={(e) =>
              setEditingAuthor({
                ...editingAuthor,
                born_date: e.target.value,
              })
            }
            className="w-full mb-2 p-2 border rounded-md"
          />
          <button
            onClick={() => handleUpdate(author.id)}
            className="mt-2 bg-green-600 text-white py-1 px-4 rounded-lg hover:bg-green-700 transition"
          >
            Save
          </button>
          <button
            onClick={() => setEditingAuthor(null)}
            className="mt-2 ml-2 bg-gray-500 text-white py-1 px-4 rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {author.name}
          </h2>
          <p className="text-gray-600 mb-2">
            {author.biography || "No biography available"}
          </p>
          <p className="text-sm text-gray-500">
            Born Date:{" "}
            <span className="text-gray-700">
              {formatToDDMMYYYY(author.born_date)}
            </span>
          </p>
          <h3 className="text-lg font-semibold text-gray-800 mt-4">Books:</h3>
          <ul className="list-disc list-inside text-gray-600">
            {author.books?.length > 0 ? (
              author.books.map((book) => <li key={book.id}>{book.title}</li>)
            ) : (
              <li>No books available</li>
            )}
          </ul>
          <button
            onClick={() => handleEdit(author)}
            className="mt-4 bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(author.id)}
            className="mt-4 ml-2 bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}
