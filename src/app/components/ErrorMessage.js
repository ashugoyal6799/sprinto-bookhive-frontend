export default function ErrorMessage({ error }) {
  return error ? (
    <p className="text-red-500 text-sm">Error: {error.message}</p>
  ) : null;
}
