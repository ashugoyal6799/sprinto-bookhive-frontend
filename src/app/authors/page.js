"use client";
import { useQuery, useMutation } from "@apollo/client";
import { GET_AUTHORS, DELETE_AUTHOR, UPDATE_AUTHOR } from "../graphql/queries";
import { useState } from "react";
import AuthorCard from "../components/AuthorCard";
import AuthorFilters from "../components/AuthorsFilter";
import Pagination from "../components/Pagination";

export default function AuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const [editingAuthor, setEditingAuthor] = useState(null);

  // Pagination state
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 3;

  // Filter state
  const [inputFilter, setInputFilter] = useState({ name: "" });
  const [filter, setFilter] = useState({ name: "" });

  const { data, loading, error, refetch } = useQuery(GET_AUTHORS, {
    variables: { filter, limit, offset },
    fetchPolicy: "cache-and-network",
    onCompleted: (newData) => {
      setAuthors(newData.authors.items);
      setTotalCount(newData.authors.totalCount);
    },
  });

  const [deleteAuthor] = useMutation(DELETE_AUTHOR, {
    onCompleted: (data) => {
      setAuthors((prevAuthors) =>
        prevAuthors.filter((author) => author.id !== data.deleteAuthor.id)
      );
    },
    onError: (err) => console.error("Delete failed:", err.message),
  });

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    onCompleted: (data) => {
      setAuthors((prevAuthors) =>
        prevAuthors.map((author) =>
          author.id === data.updateAuthor.id ? data.updateAuthor : author
        )
      );
      setEditingAuthor(null);
    },
    onError: (err) => console.error("Update failed:", err.message),
  });

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this author?")) {
      await deleteAuthor({ variables: { id } });
    }
  };

  const handleEdit = (author) => {
    const formattedAuthor = {
      ...author,
      born_date: author.born_date
        ? new Date(parseInt(author.born_date, 10)).toISOString().split("T")[0]
        : "",
    };
    setEditingAuthor(author.id === editingAuthor?.id ? null : formattedAuthor);
  };

  const handleUpdate = async (id) => {
    if (!editingAuthor.name.trim() || !editingAuthor.biography.trim()) {
      alert("Name and biography cannot be empty.");
      return;
    }
    await updateAuthor({
      variables: {
        id,
        name: editingAuthor.name,
        biography: editingAuthor.biography,
        born_date: editingAuthor.born_date || null,
      },
    });
  };

  const applyFilters = () => {
    setFilter({ ...inputFilter });
    setOffset(0);
    refetch({ filter: inputFilter, limit, offset: 0 });
  };

  const resetFilters = () => {
    setInputFilter({ name: "" });
    setFilter({ name: "" });
    setOffset(0);
    refetch({ filter: {}, limit, offset: 0 });
  };

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-green-600">
        Authors List
      </h1>

      <AuthorFilters
        inputFilter={inputFilter}
        setInputFilter={setInputFilter}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {authors.map((author) => (
          <AuthorCard
            key={author.id}
            author={author}
            editingAuthor={editingAuthor}
            setEditingAuthor={setEditingAuthor}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleUpdate={handleUpdate}
          />
        ))}
      </div>

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
