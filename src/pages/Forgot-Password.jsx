import { useState } from "react";
import { useContext } from "react";
import DataContext from "../Context/DataContext";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const { userInfo, setUserInfo, errors, setErrors } = useContext(DataContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const handleChangePassword = (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/;
    const registeredUsers = localStorage.getItem("registeredUsers");

    if (registeredUsers) {
      const parsedUsers = JSON.parse(registeredUsers);
      const foundUser = parsedUsers.find(
        (user) => user.email === userInfo.email && user.password === oldPassword
      );

      if (foundUser && passwordRegex.test(newPassword)) {
        foundUser.password = newPassword; // Update the password
        localStorage.setItem("registeredUsers", JSON.stringify(parsedUsers)); // Update localStorage
        setErrors("");
        alert("Password updated successfully!");
        navigate("/shop");
        setOldPassword("");
        setNewPassword("");
      } else if (!passwordRegex.test(newPassword)) {
        setErrors(
          "Invalid password(Include capital and small letters, numbers, special characters and must be at least 10 characters long."
        );
      } else {
        setErrors("User not found!");
      }
    }
  };

  return (
    <div className={`flex items-center justify-center flex-col pt-[55px] pb-7`}>
      <div className="text-center rounded max-w-[400px] w-full p-6">
        <h1 className="text-xl font-bold mb-4 text-center">
          Reset Your Password
        </h1>
        <form
          onSubmit={handleChangePassword}
          className="flex flex-col items-center flex-wrap gap-5 "
        >
          <div className="flex flex-col gap-5 items-center justify-center w-full">
            <input
              required
              id="email"
              type="email"
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              placeholder="Email"
              className="rounded-md border border-[#6d6d6d] bg-white py-2 px-3 font-medium text-[gray] outline-none max-w-[220px] w-full"
            />

            <input
              required
              maxLength="15"
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Old Password"
              className="rounded-md border border-[#6d6d6d] bg-white py-2 px-3 text-base font-medium text-[gray] outline-none max-w-[220px] w-full"
            />

            <input
              required
              id="newPassword"
              maxLength="15"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="rounded-md border border-[#6d6d6d] bg-white py-2 px-3 text-base font-medium text-[gray] outline-none max-w-[220px] w-full"
            />
          </div>
          {errors && (
            <p className="text-red-600 font-semibold text-center leading-4">
              {errors}
            </p>
          )}

          <button
            type="submit"
            className="hover:opacity-80 rounded-md bg-[#6d6d6d] py-2 px-6 font-semibold text-white outline-none mt-2"
          >
            Reset Password
          </button>

          <Link
            to="/login"
            className="text-blue-600 underline hover:opacity-80"
          >
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
}
