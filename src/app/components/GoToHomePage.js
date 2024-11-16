// components/GoToHomePage.js
import Link from "next/link";

export default function GoToHomePage() {
  return (
    <div className="fixed top-4 left-4">
      <Link
        href="/"
        className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Main Menu
      </Link>
    </div>
  );
}
