import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { setDetails, setToken } from "./utils/authentication";

const api = import.meta.env.VITE_DB_API;

const Signintemplate = () => {
  const [formdata, setdata] = useState<{ [key: string]: string }>({
    username: "",
    password: "",
  });
  const [field, setfield] = useState(false);
  const [isusername, setusername] = useState(true);

  //   const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const change = () => {
      for (let i in formdata) {
        // console.log(i);
        if (formdata[i].trim() === "") {
          setfield(false);
          return;
        }
      }
      setfield(true);
    };
    change();
  }, [formdata]);

  const handleClick = async () => {
    if (field) {
      const response = await fetch(api + "login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formdata.username,
          password: formdata.password,
        }),
      });
      if (response.status >= 400) {
        setusername(false);
        return;
      }
      const data = await response.json();
      setToken(data.token);
      setDetails(data.user.username, data.user.email);
      navigate("/");
      // console.log(data);
    }
  };

  const handleChange = (e: any) => {
    setdata({ ...formdata, [e.target.name]: e.target.value });
  };

  return (
    <div className="font-sans w-[80%] text-left space-y-[1.5rem] font-bold max-sm:w-full">
      <p className="font-bold text-md text-right text-gray-500">
        Not a member?{" "}
        <span
          onClick={() => navigate("/signup")}
          className="text-purple-600 hover:cursor-pointer"
        >
          Sign up
        </span>
      </p>
      <div>
        <p className="text-3xl mb-10">Sign In</p>
        <p
          id="errorPara"
          className={`text-red-400 text-md font-semibold ${
            isusername ? "hidden" : ""
          }`}
        >
          &nbsp;
          <span className="text-[1.6rem]">.</span> Username/Password Incorrect
        </p>
      </div>
      <div className="space-y-[2rem] w-[71.6%] max-sm:w-full">
        <div>
          <p className="text-md">
            <span className={`${isusername ? "hidden" : ""}`}>
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                style={{ color: "#ee6d6d" }}
              />
            </span>
            &nbsp; Username
          </p>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="User_234"
            className={`rounded-xl py-2 outline-none px-5 font-medium ${
              isusername ? "bg-gray-100" : "bg-red-100 placeholder-red-400"
            } w-full`}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <p className="text-md">
            <span className={`${isusername ? "hidden" : ""}`}>
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                style={{ color: "#ee6d6d" }}
              />
            </span>
            &nbsp; Password
          </p>
          <input
            type="password"
            name="password"
            id="pass"
            placeholder="6+ characters"
            className="bg-gray-100 rounded-xl py-2 outline-none px-5 font-medium w-full mb-5"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={handleClick}
            className={`px-12 py-2 ${
              field ? "bg-[#0d0c22]" : "bg-[#1c1b3a]"
            } font-semibold text-white rounded-xl mb-4`}
          >
            Sign In
          </motion.button>
          <p className="text-gray-400 text-sm font-medium">
            This is protected by the CAPTCHA and the Google <br />
            <span className="text-purple-600">Privacy Policy</span> and{" "}
            <span className="text-purple-600">Terms of Conditions</span> apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signintemplate;
