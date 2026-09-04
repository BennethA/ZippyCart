import { useContext } from "react";
import DataContext from "../Context/DataContext";

export default function AdminUsers() {
  const { userInfo, darkMode } = useContext(DataContext);

  const totalUsers = JSON.parse(
    localStorage.getItem("registeredUsers") || "[]"
  ).length;
  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      } transition`}
    >
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      <div
        className={`rounded-2xl shadow-md p-6 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {userInfo?.email ? (
          <>
            <h2 className="text-lg font-semibold mb-2">
              {userInfo.name || "Unnamed User"}
            </h2>
            <p className="opacity-80 mb-2">{userInfo.email}</p>
            <p className="text-sm opacity-60">Password: ••••••••</p>
          </>
        ) : (
          <p className="opacity-60">No registered users yet.</p>
        )}
      </div>
    </div>
  );
}
