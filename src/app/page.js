export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-indigo-600 text-white">
      <h1 className="text-4xl font-bold mb-6">
        Welcome to the Book Management App
      </h1>
      <p className="text-lg mb-8 text-center">
        Manage your collection of books and authors with ease.
      </p>
      <div className="flex gap-4">
        <a
          href="/books"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          View Books
        </a>
        <a
          href="/books/add"
          className="bg-white text-green-600 px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          Add a Book
        </a>
        <a
          href="/authors"
          className="bg-white text-purple-600 px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          View Authors
        </a>
        <a
          href="/authors/add"
          className="bg-white text-orange-600 px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          Add an Author
        </a>
      </div>
    </div>
  );
}
