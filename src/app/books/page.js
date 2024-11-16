"use client";

import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import {
  GET_BOOKS,
  DELETE_BOOK,
  UPDATE_BOOK,
  GET_REVIEWS_BY_BOOK,
  ADD_REVIEW,
} from "../graphql/queries";
import { useState } from "react";
import BookCard from "../components/BookCard";
import BookFilter from "../components/BooksFilter";
import Pagination from "../components/Pagination";

export default function BooksPage() {
  const [offset, setOffset] = useState(0);
  const [books, setBooks] = useState([]);
  const [activeReviews, setActiveReviews] = useState({});
  const [editingBook, setEditingBook] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(null);
  const [newReview, setNewReview] = useState({ content: "", rating: 1 });

  // Pagination state
  const [totalCount, setTotalCount] = useState(0);
  const limit = 6;

  // Filters for books
  const [filter, setFilter] = useState({
    title: "",
    author_name: "",
    published_date: "",
  });

  const [inputFilter, setInputFilter] = useState({
    title: "",
    author_name: "",
    published_date: "",
  });

  // Fetch books and populate the state
  const { loading, error, refetch } = useQuery(GET_BOOKS, {
    variables: { limit, offset, filter },
    fetchPolicy: "no-cache",
    onCompleted: (newData) => {
      setBooks(newData.books.items);
      setTotalCount(newData.books.totalCount);
    },
  });

  // Delete book mutation
  const [deleteBook] = useMutation(DELETE_BOOK, {
    onCompleted: (data) => {
      setBooks((prevBooks) =>
        prevBooks.filter((book) => book.id !== data.deleteBook.id)
      );
    },
    onError: (err) => console.error("Delete failed:", err.message),
  });

  // Update book mutation
  const [updateBook] = useMutation(UPDATE_BOOK, {
    onCompleted: (data) => {
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === data.updateBook.id ? data.updateBook : book
        )
      );
      setEditingBook(null);
    },
    onError: (err) => console.error("Update failed:", err.message),
  });

  // Fetch reviews lazily
  const [fetchReviews] = useLazyQuery(GET_REVIEWS_BY_BOOK);

  // Add review mutation
  const [addReview] = useMutation(ADD_REVIEW, {
    onCompleted: (data) => {
      const bookId = showReviewForm;
      setActiveReviews((prevReviews) => ({
        ...prevReviews,
        [bookId]: [...(prevReviews[bookId] || []), data.addReview],
      }));
      setShowReviewForm(null);
      setNewReview({ content: "", rating: 1 });
    },
    onError: (err) => console.error("Add review failed:", err.message),
  });

  // Handle filters
  const handleFilterChange = (e) => {
    setInputFilter({ ...inputFilter, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    setFilter({ ...inputFilter });
    setOffset(0); // Reset to the first page when applying filters
    refetch({ filter: inputFilter, limit, offset: 0 });
  };

  const resetFilters = () => {
    setInputFilter({ title: "", author_name: "", published_date: "" });
    setFilter({ title: "", author_name: "", published_date: "" });
    setOffset(0); // Reset to the first page when clearing filters
    refetch({ filter: {}, limit, offset: 0 });
  };

  // Handle pagination
  const handleNextPage = () => {
    const newOffset = offset + limit;
    if (newOffset < totalCount) {
      setOffset(newOffset);
      refetch({ filter, limit, offset: newOffset });
    }
  };

  const handlePreviousPage = () => {
    const newOffset = offset - limit;
    if (newOffset >= 0) {
      setOffset(newOffset);
      refetch({ filter, limit, offset: newOffset });
    }
  };

  // Handle deletion
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this book?")) {
      await deleteBook({ variables: { id } });
    }
  };

  // Handle edit toggling
  const handleEdit = (book) => {
    setEditingBook(book.id === editingBook?.id ? null : { ...book });
  };

  // Handle book update
  const handleUpdate = async (id) => {
    if (!editingBook.title.trim() || !editingBook.description.trim()) {
      alert("Title and description cannot be empty.");
      return;
    }
    await updateBook({
      variables: {
        id,
        title: editingBook.title,
        description: editingBook.description,
      },
    });
  };

  // View reviews
  const handleViewReviews = async (bookId) => {
    const { data } = await fetchReviews({ variables: { bookId } });
    setActiveReviews((prevReviews) => ({
      ...prevReviews,
      [bookId]: data.reviewsByBook,
    }));
  };

  // Close reviews
  const handleCloseReviews = (bookId) => {
    setActiveReviews((prevReviews) => {
      const updatedReviews = { ...prevReviews };
      delete updatedReviews[bookId];
      return updatedReviews;
    });
  };

  // Add review
  const handleAddReview = (bookId) => {
    setShowReviewForm(bookId);
  };

  // Submit review
  const handleReviewSubmit = async (bookId) => {
    await addReview({
      variables: {
        input: { bookId, ...newReview },
      },
    });
  };

  // Cancel review form
  const handleCancelReview = () => {
    setShowReviewForm(null);
    setNewReview({ content: "", rating: 1 });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Books List
      </h1>

      {/* Filters Section */}
      <BookFilter
        inputFilter={inputFilter}
        setInputFilter={setInputFilter}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
      />

      {/* Books List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && (
          <p className="text-center text-gray-500">Loading books...</p>
        )}
        {error && (
          <p className="text-center text-red-500">Error: {error.message}</p>
        )}
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            editingBook={editingBook}
            setEditingBook={setEditingBook}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleUpdate={handleUpdate}
            handleViewReviews={handleViewReviews}
            handleAddReview={handleAddReview}
            activeReviews={activeReviews}
            handleCloseReviews={handleCloseReviews}
            showReviewForm={showReviewForm}
            setShowReviewForm={setShowReviewForm}
            newReview={newReview}
            setNewReview={setNewReview}
            handleReviewSubmit={handleReviewSubmit}
            handleCancelReview={handleCancelReview}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <Pagination
        offset={offset}
        limit={limit}
        totalCount={totalCount}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />
    </div>
  );
}
