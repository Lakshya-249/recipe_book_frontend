import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getDetails, getToken, removeToken } from "./utils/authentication.ts";
import SearchTab from "./searchTab.tsx";

function Header() {
  const [islogedIn, setlog] = useState(false);
  const [show, setshow] = useState(false);
  useEffect(() => {
    const check = getToken();
    // console.log(check);

    if (check === "none") setlog(true);
    else setlog(false);
  }, []);

  const handleLogout = () => {
    removeToken();
    setlog(true);
  };

  const handlemouse = () => {
    setshow(true);
  };
  const handlemouseleave = () => {
    setshow(false);
  };
  return (
    <div className=" sticky top-0 z-30">
      <div className="w-full h-[3.5rem] max-sm:hidden text-white text-sm font-semibold bg-black mb-[1px] flex justify-between px-5 items-center">
        <div className="flex items-center space-x-10">
          <NavLink to="/">
            <p>Home</p>
          </NavLink>
          <NavLink to="/recipe">
            <p>Recipes</p>
          </NavLink>
          <p className="hover:cursor-pointer">About us</p>
        </div>
        <div className="text-2xl font-[Forte]">Online Kitchen</div>
        <div className="space-x-5 flex items-center text-sm font-semibold">
          <SearchTab />
          {islogedIn ? (
            <div className="space-x-5 flex items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink
                  to="/signup"
                  className="px-5 py-2 font-bold rounded-xl text-black bg-white"
                >
                  Sign Up
                </NavLink>
              </motion.button>

              <NavLink to="/login">Login</NavLink>
            </div>
          ) : (
            <div>
              <div
                onMouseOver={handlemouse}
                onMouseOut={handlemouseleave}
                className="w-[2.4rem] h-[2.4rem] rounded-full flex justify-center 
          text-2xl font-bold items-center bg-slate-300"
              >
                <NavLink to="/profile">
                  {getDetails().username[0].toUpperCase()}
                </NavLink>
              </div>
              {show ? (
                <div
                  onMouseOver={handlemouse}
                  onMouseOut={handlemouseleave}
                  className="absolute top-[3rem] right-0 flex flex-col justify-between p-5 bg-white text-sm 
                text-gray-400 font-semibold w-[15rem] space-y-[1rem] rounded-2xl shadow-2xl"
                >
                  <div>
                    <p>{getDetails().username}</p>
                    <p>{getDetails().email}</p>
                  </div>
                  <button className="py-4 px-5 rounded-full w-full text-sm font-semibold border-[1px]">
                    <NavLink to="/addrecipe">Add recipe</NavLink>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="py-4 px-5 bg-red-600 text-white rounded-full w-full text-sm font-semibold border-[1px]"
                  >
                    Log out
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
