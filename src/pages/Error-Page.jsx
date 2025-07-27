import { Link } from "react-router-dom";
import { BiError } from "react-icons/bi";

export default function ErrorPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 pt-[55px] pb-7 text-center">
      <BiError className="text-red-500 text-6xl" />
      <h1 className="text-3xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-md">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been
        moved.
      </p>
      <Link
        to="/"
        className="text-blue-500 underline font-medium hover:text-blue-700"
      >
        Return to Home Page
      </Link>
    </main>
  );
}
