import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faXmark } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { getDetails, getToken, removeToken } from "./utils/authentication";
import LoginTemplate from "./loginTemplate";
import SearchTab from "./searchTab";

function Header2() {
  const [Icon, seticon] = useState(faBarsStaggered);
  const navigate = useNavigate();
  const ref1 = useRef<HTMLDivElement>(null);
  const [islog, setlog] = useState(false);
  const [islogedin, setLog] = useState(true);

  useEffect(() => {
    const check = getToken();
    if (check === "none") setLog(false);
    else setLog(true);
  }, []);

  const togglewindow = () => {
    if (ref1.current) {
      ref1.current.classList.toggle("hidden");
    }
    if (Icon === faBarsStaggered) {
      seticon(faXmark);
    } else {
      seticon(faBarsStaggered);
    }
  };
  const handleAdd = () => {
    const check = getToken();
    if (check === "none") {
      setlog(!islog);
    } else navigate("/addrecipe");
  };

  return (
    <div className="sticky top-0 z-30">
      <div className="max-sm:flex bg-black items-center mb-[1.5px] justify-between hidden w-full max-sm:px-3.5 h-[4rem]">
        <div className="flex items-center space-x-5">
          <div className="">
            <FontAwesomeIcon
              icon={Icon}
              size="xl"
              color="white"
              onClick={togglewindow}
            />
          </div>
        </div>
        <div className="flex items-center space-x-5">
          <SearchTab />
          {islogedin ? (
            <div
              className="w-[3rem] h-[3rem] rounded-full flex justify-center 
          text-2xl font-bold items-center text-white bg-slate-300"
            >
              <NavLink to="/profile">
                {getDetails().username[0].toUpperCase()}
              </NavLink>
            </div>
          ) : (
            ""
          )}
        </div>
        <div
          ref={ref1}
          className="absolute hidden shadow-2xl bg-white z-30 text-left top-[4rem] left-0 text-sm font-semibold font-[Mona sans]
    border-t-[0.25px] border-gray-400 w-full space-y-5 p-7 flex flex-col"
        >
          <NavLink to="/">Home</NavLink>
          <NavLink to="/recipe">Recipe</NavLink>
          <NavLink to="/">About Us</NavLink>

          <div className="h-1 w-full border-b-2"></div>
          <p onClick={handleAdd}>Add recipe</p>
          {islogedin ? (
            <p
              onClick={() => {
                removeToken();
                setLog(false);
              }}
            >
              Log out
            </p>
          ) : (
            <p onClick={() => navigate("/login")}>Log in</p>
          )}
        </div>
      </div>
      {islog ? <LoginTemplate word={"add recipe"} setlogin={setlog} /> : ""}
    </div>
  );
}

export default Header2;
