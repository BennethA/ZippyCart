import { useContext } from "react";
import DataContext from "../Context/DataContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { userInfo, setUserInfo, errors, setLogIn, setErrors } =
    useContext(DataContext);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const registeredUsers = localStorage.getItem("registeredUsers");

    if (registeredUsers) {
      const parsedUsers = JSON.parse(registeredUsers);
      const foundUser = parsedUsers.find(
        (user) =>
          user.email === userInfo.email && user.password === userInfo.password
      );
      if (foundUser) {
        setUserInfo(foundUser);
        setErrors("");
        alert("Login successfull!");
        setLogIn(true);
        navigate("/shop");
      } else {
        alert("User not found!");
        setErrors("User not found");
      }
    } else {
      alert("No registered users. Create a new account and try again!");
      setErrors("No registered users. Create a new account and try again.");
    }
  };

  return (
    <main className={`flex items-center justify-center pt-[75px]`}>
      <div className="w-full max-w-sm mx-auto rounded-lg shadow dark:shadow-white p-6">
        <h1 className="text-2xl font-bold mb-1 dark:text-white text-center">
          Welcome 👋
        </h1>
        <p className="text-gray-600 dark:text-[#c0c0c0] mb-4 text-center">
          Log in to continue shopping
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-wrap items-center justify-center gap-5"
        >
          <div className="flex flex-col gap-5 items-center justify-center">
            <input
              required
              id="email"
              type="email"
              autoComplete="email"
              value={userInfo.email}
              placeholder="Email"
              onChange={(event) => {
                setErrors("");
                setUserInfo({ ...userInfo, email: event.target.value });
              }}
              className="w-full rounded-md border border-[#6d6d6d] bg-white py-2 px-3 font-medium text-[gray] outline-none max-w-[300px] focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
            />
            <input
              required
              id="password"
              maxLength="15"
              type="password"
              autoComplete="current-password"
              value={userInfo.password}
              placeholder="Password"
              onChange={(event) =>
                setUserInfo({ ...userInfo, password: event.target.value })
              }
              className="w-full rounded-md border border-[#6d6d6d] bg-white py-2 px-3 font-medium text-[gray] outline-none max-w-[300px] focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
            />
          </div>

          <div className="flex flex-wrap w-full items-between justify-between text-black dark:text-[#c0c0c0]">
            <Link to="/forgotPassword" className="hover:text-[blue]">
              Forgot password?
            </Link>

            <Link to="/register" className="cursor-pointer hover:text-[blue] ">
              Don`t have an account.
            </Link>
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
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
