import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegCircleDot } from "react-icons/fa6";
import DataContext from "../Context/DataContext";

export default function Register() {
  const { setUserInfo, setErrors, errors, setLogIn } =
    useContext(DataContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameRegex = /^[a-zA-Z]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/;

    // Validations
    if (!nameRegex.test(name)) {
      setErrors("Name must be at least 5 characters short.");
      return;
    }
    if (!emailRegex.test(email)) {
      setErrors("Please enter a valid Gmail.");
      return;
    }
    if (!passwordRegex.test(password)) {
      setErrors(
        "Invalid password(Include capital and small letters, numbers, special characters and must be at least 10 characters long."
      );
      return;
    }

    // Check for duplicate email
    const registeredUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const userExists = registeredUsers.find((user) => user.email === email);

    if (userExists) {
      setErrors("An account with this email already exists.");
      return;
    }

    // Save new user
    const newUser = { name, email, password };
    localStorage.setItem(
      "registeredUsers",
      JSON.stringify([...registeredUsers, newUser])
    );

    // Save in context too if needed
    setUserInfo(newUser);
    alert("Log in successfull!")
    setLogIn(true);
    setErrors("");

    navigate("/shop");
  };

  return (
    <main className="flex items-center justify-center pt-[55px] pb-7 ">
      <div className="text-center rounded max-w-[400px] w-full p-6">
        <div className="text-lg font-bold mb-4 gap-1 flex flex-col">
          <p>Create a New Account</p>
          <div className="flex justify-center gap-2">
            <FaRegCircleDot className="text-xs" />
            <FaRegCircleDot className="text-xs" />
            <FaRegCircleDot className="text-xs" />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-wrap items-center justify-center gap-5"
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            maxLength={"15"}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-gray-400 py-2 px-3 font-medium text-gray-600 outline-none max-w-[220px]"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-400 py-2 px-3 font-medium text-gray-600 outline-none max-w-[220px]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            minLength={"10"}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-400 py-2 px-3 font-medium text-gray-600 outline-none max-w-[220px]"
          />

          {errors && (
            <p className="text-red-600 font-semibold text-center leading-4">
              {errors}
            </p>
          )}

          <button
            type="submit"
            className="hover:opacity-80 rounded-md bg-[#6d6d6d] py-2 px-6 font-semibold text-white outline-none mt-2"
          >
            Register
          </button>

          <Link to="/login" className="text-blue-500 hover:underline text-sm">
            Already have an account? Login
          </Link>
        </form>
      </div>
    </main>
  );
}
