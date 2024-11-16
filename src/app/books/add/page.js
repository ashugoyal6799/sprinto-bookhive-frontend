"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_BOOK, GET_AUTHORS } from "../../graphql/queries";
import { useRouter } from "next/navigation";
import FormField from "../../components/FormField";
import SubmitButton from "../../components/SubmitButton";
import ErrorMessage from "../../components/ErrorMessage";

export default function AddBookPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [authorId, setAuthorId] = useState("");

  const router = useRouter();

  const [createBook, { loading, error }] = useMutation(CREATE_BOOK, {
    onCompleted: () => router.push("/books"),
  });

  const {
    data,
    loading: authorsLoading,
    error: authorsError,
  } = useQuery(GET_AUTHORS, {
    variables: { limit: 100, offset: 0 },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !publishedDate || !authorId) {
      alert("Title, Published Date, and Author are required!");
      return;
    }

    await createBook({
      variables: {
        title,
        description,
        published_date: publishedDate,
        author_id: authorId,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Add New Book
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
            required
          />
          <FormField
            label="Description"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter book description"
          />
          <FormField
            label="Published Date"
            type="date"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
            required
          />
          <div>
            <label className="block text-gray-700">Author</label>
            {authorsLoading ? (
              <p className="text-gray-500">Loading authors...</p>
            ) : authorsError ? (
              <p className="text-red-500">Error loading authors</p>
            ) : (
              <select
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              >
                <option value="">Select an author</option>
                {data.authors.items.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <ErrorMessage error={error} />
          <SubmitButton loading={loading} label="Add Book" />
        </form>
      </div>
    </div>
  );
}
