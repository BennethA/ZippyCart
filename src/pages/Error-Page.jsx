import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div
      className={`h-[300px] flex items-center justify-center flex-col gap-3 pt-[55px] pb-7`}
    >
      <p className="text-[red] text-4xl">Error: Page Not Found</p>
      <Link to="/" className="text-blue-400 text-xl underline">
        Return to home page
      </Link>
    </div>
  );
}
