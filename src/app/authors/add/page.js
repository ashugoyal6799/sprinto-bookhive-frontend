"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_AUTHOR } from "../../graphql/queries";
import { useRouter } from "next/navigation";
import FormField from "../../components/FormField";
import SubmitButton from "../../components/SubmitButton";
import ErrorMessage from "../../components/ErrorMessage";

export default function AddAuthorPage() {
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");
  const [bornDate, setBornDate] = useState("");

  const router = useRouter();

  const [createAuthor, { loading, error }] = useMutation(CREATE_AUTHOR, {
    onCompleted: () => router.push("/authors"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      alert("Name is required!");
      return;
    }

    await createAuthor({
      variables: {
        name,
        biography,
        born_date: bornDate || null,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-green-600">
          Add New Author
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter author name"
            required
          />
          <FormField
            label="Biography"
            type="textarea"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            placeholder="Enter author biography"
          />
          <FormField
            label="Born Date"
            type="date"
            value={bornDate}
            onChange={(e) => setBornDate(e.target.value)}
          />
          <ErrorMessage error={error} />
          <SubmitButton loading={loading} label="Add Author" />
        </form>
      </div>
    </div>
  );
}
