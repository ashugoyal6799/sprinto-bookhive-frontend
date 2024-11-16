import { formatToDDMMYYYY } from "../utils/formateDate";

export default function BookCard({
  book,
  editingBook,
  setEditingBook,
  handleDelete,
  handleEdit,
  handleUpdate,
  handleViewReviews,
  handleAddReview,
  activeReviews,
  handleCloseReviews,
  showReviewForm,
  setShowReviewForm,
  newReview,
  setNewReview,
  handleReviewSubmit,
  handleCancelReview,
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
      {editingBook?.id === book.id ? (
        <>
          <input
            type="text"
            value={editingBook.title}
            onChange={(e) =>
              setEditingBook({ ...editingBook, title: e.target.value })
            }
            className="w-full mb-2 p-2 border rounded-md"
            placeholder="Edit title"
          />
          <textarea
            value={editingBook.description}
            onChange={(e) =>
              setEditingBook({
                ...editingBook,
                description: e.target.value,
              })
            }
            className="w-full mb-2 p-2 border rounded-md"
            placeholder="Edit description"
          />
          <button
            onClick={() => handleUpdate(book.id)}
            className="mt-2 bg-green-600 text-white py-1 px-4 rounded-lg hover:bg-green-700 transition"
          >
            Save
          </button>
          <button
            onClick={() => setEditingBook(null)}
            className="mt-2 ml-2 bg-gray-500 text-white py-1 px-4 rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {book.title}
          </h2>
          <p className="text-gray-600 mb-2">
            {book.description || "No description available"}
          </p>
          <p className="text-sm text-gray-500">
            Published Date:{" "}
            <span className="text-gray-700">
              {formatToDDMMYYYY(book.published_date)}
            </span>
          </p>
          <p className="text-sm text-gray-500">
            Author: <span className="text-gray-700">{book.author?.name}</span>
          </p>
          <button
            onClick={() => handleEdit(book)}
            className="mt-4 bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(book.id)}
            className="mt-4 ml-2 bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition"
          >
            Delete
          </button>
          <button
            onClick={() => handleViewReviews(book.id)}
            className="mt-4 ml-2 bg-green-500 text-white py-1 px-4 rounded-lg hover:bg-green-600 transition"
          >
            View Reviews
          </button>
          <button
            onClick={() => handleAddReview(book.id)}
            className="mt-4 ml-2 bg-purple-500 text-white py-1 px-4 rounded-lg hover:bg-purple-600 transition"
          >
            Add Review
          </button>
        </>
      )}
      {activeReviews[book.id] && (
        <div className="mt-4 bg-gray-50 p-4 rounded-md">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold mb-2">Reviews:</h3>
            <button
              onClick={() => handleCloseReviews(book.id)}
              className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition"
            >
              Close Reviews
            </button>
          </div>
          {activeReviews[book.id].length > 0 ? (
            activeReviews[book.id].map((review) => (
              <div key={review.id} className="mb-3">
                <p className="text-gray-700">{review.content}</p>
                <p className="text-sm text-gray-500">
                  Rating: {review.rating} / 5
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(review.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews available.</p>
          )}
        </div>
      )}
      {showReviewForm === book.id && (
        <div className="mt-4">
          <textarea
            className="w-full p-2 border rounded-md"
            placeholder="Write your review..."
            value={newReview.content}
            onChange={(e) =>
              setNewReview({ ...newReview, content: e.target.value })
            }
          ></textarea>
          <input
            type="number"
            min="1"
            max="5"
            className="w-full p-2 border rounded-md mt-2"
            placeholder="Rating (1-5)"
            value={newReview.rating || ""}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              setNewReview({
                ...newReview,
                rating: isNaN(value) ? 1 : value,
              });
            }}
          />
          <div className="flex justify-between mt-2">
            <button
              onClick={() => handleReviewSubmit(book.id)}
              className="bg-green-600 text-white py-1 px-4 rounded-lg hover:bg-green-700 transition"
            >
              Submit Review
            </button>
            <button
              onClick={handleCancelReview}
              className="bg-gray-500 text-white py-1 px-4 rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
