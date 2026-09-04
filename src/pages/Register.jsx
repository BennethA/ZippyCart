import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FiArrowRight,
  FiCheck,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiShield,
  FiShoppingBag,
  FiUser,
} from "react-icons/fi";

import DataContext from "../Context/DataContext";

export default function Register() {
  const { setUserInfo, setErrors, errors, setLogIn } =
    useContext(DataContext);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameRegex = /^[a-zA-Z]+$/;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{10,}$/;

    // Validations
    if (!nameRegex.test(name) || name.length < 5) {
      setErrors("Name must contain only letters and be at least 5 characters.");
      return;
    }

    if (!emailRegex.test(email)) {
      setErrors("Please enter a valid Gmail address.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrors(
        "Password must contain uppercase and lowercase letters, a number, a special character, and be at least 10 characters long."
      );
      return;
    }

    // Check for duplicate email
    const registeredUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];

    const userExists = registeredUsers.find(
      (user) => user.email === email
    );

    if (userExists) {
      setErrors("An account with this email already exists.");
      return;
    }

    // Save new user
    const newUser = {
      name,
      email,
      password,
    };

    localStorage.setItem(
      "registeredUsers",
      JSON.stringify([...registeredUsers, newUser])
    );

    setUserInfo(newUser);
    setLogIn(true);
    setErrors("");

    navigate("/shop");
  };

  return (
    <main className="min-h-[calc(100vh-140px)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[1150px] overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#0d0d0d] lg:grid-cols-2">
        {/* LEFT — BRAND PANEL */}
        <section className="relative hidden min-h-[680px] overflow-hidden bg-black lg:block">
          {/* Decorative circles */}
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full border border-white/10" />

          <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white xl:p-14">
            <div>
              {/* LOGO */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10">
                  <FiShoppingBag size={21} />
                </div>

                <span className="font-serif text-2xl tracking-wide">
                  ZippyCart
                </span>
              </div>

              {/* MESSAGE */}
              <div className="mt-24 max-w-md">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                  Join ZippyCart
                </p>

                <h2 className="font-serif text-5xl leading-[1.08] xl:text-6xl">
                  Find your style.
                  <br />
                  Make it yours.
                </h2>

                <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">
                  Create your account and discover clothing, footwear,
                  accessories and more, all in one place.
                </p>

                {/* BENEFITS */}
                <div className="mt-10 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-white/70">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                      <FiCheck size={14} />
                    </span>
                    Discover new styles
                  </div>

                  <div className="flex items-center gap-3 text-sm text-white/70">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                      <FiCheck size={14} />
                    </span>
                    Easy shopping experience
                  </div>

                  <div className="flex items-center gap-3 text-sm text-white/70">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                      <FiCheck size={14} />
                    </span>
                    Keep your account in one place
                  </div>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex items-center gap-3 border-t border-white/10 pt-6 text-xs text-white/50">
              <FiShield size={16} />
              <span>Simple, secure and effortless shopping.</span>
            </div>
          </div>
        </section>

        {/* RIGHT — REGISTER FORM */}
        <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-12 xl:px-16">
          <div className="w-full max-w-[430px]">
            {/* MOBILE BRAND */}
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
                <FiShoppingBag size={19} />
              </div>

              <span className="font-serif text-2xl font-semibold">
                ZippyCart
              </span>
            </div>

            {/* HEADING */}
            <div className="mb-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
                Account
              </p>

              <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                Create account.
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
                Join ZippyCart and start shopping your way.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* NAME */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                >
                  Full name
                </label>

                <div className="relative">
                  <FiUser
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    required
                    id="name"
                    type="text"
                    minLength="5"
                    maxLength="15"
                    autoComplete="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => {
                      setErrors("");
                      setName(e.target.value);
                    }}
                    className="h-13 w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm font-medium text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white focus:ring-1 focus:ring-black dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white dark:focus:bg-white/10 dark:focus:ring-white"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                >
                  Email address
                </label>

                <div className="relative">
                  <FiMail
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    required
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@gmail.com"
                    value={email}
                    onChange={(e) => {
                      setErrors("");
                      setEmail(e.target.value);
                    }}
                    className="h-13 w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm font-medium text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white focus:ring-1 focus:ring-black dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white dark:focus:bg-white/10 dark:focus:ring-white"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                >
                  Password
                </label>

                <div className="relative">
                  <FiLock
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    required
                    id="password"
                    type={showPassword ? "text" : "password"}
                    minLength="10"
                    autoComplete="new-password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => {
                      setErrors("");
                      setPassword(e.target.value);
                    }}
                    className="h-13 w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-12 text-sm font-medium text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white focus:ring-1 focus:ring-black dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white dark:focus:bg-white/10 dark:focus:ring-white"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-200 hover:text-black dark:hover:bg-white/10 dark:hover:text-white"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>

                <p className="mt-2 text-[11px] leading-5 text-gray-400">
                  Use at least 10 characters with uppercase, lowercase, a
                  number and a special character.
                </p>
              </div>

              {/* ERROR */}
              {errors && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold leading-5 text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                  {errors}
                </div>
              )}

              {/* REGISTER BUTTON */}
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-black px-6 py-3.5 text-sm font-bold tracking-wide text-white transition hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                CREATE ACCOUNT
                <FiArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </form>

            {/* LOGIN */}
            <div className="mt-8 border-t border-gray-200 pt-6 text-center dark:border-white/10">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-bold text-black underline underline-offset-4 transition hover:opacity-60 dark:text-white"
                >
                  Log in
                </Link>
              </p>
            </div>

            {/* TRUST */}
            <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-gray-400">
              <FiLock size={13} />
              <span>Your account information stays protected.</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}