import { useContext } from "react";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import UserData from "../components/User-Data";
import DataContext from "../Context/DataContext";
import Back from "../components/Back";

export default function UserInformation() {
  const { userInfo, logIn, setLogIn } = useContext(DataContext);

  const navigate = useNavigate();
  return (
    <>
      <Back />
      <div
        className={`px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pt-[55px] flex flex-col items-center justify-center gap-2 pb-7`}
      >
        <Title text1="USER" text2="INFORMATION" />

        {logIn ? <UserData details={logIn && userInfo} /> : ""}

        <button
          onClick={() => (logIn ? setLogIn(false) : navigate("/logIn"))}
          className="hover:opacity-80 rounded-md bg-[#6d6d6d] py-2 px-6 font-semibold text-white outline-none mt-2"
        >
          {logIn ? "Log Out" : "Log In"}
        </button>
      </div>
    </>
  );
}
