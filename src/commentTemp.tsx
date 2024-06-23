import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { getDetails, getToken } from "./utils/authentication";
import { motion } from "framer-motion";

const api = import.meta.env.VITE_DB_API;

function CommentTemp({
  recipe,
  setcomment,
}: {
  recipe: string;
  setcomment: (bl: boolean) => void;
}) {
  const [comm, setcomm] = useState("");
  const handlechange = (e: any) => {
    setcomm(e.target.value);
  };
  const handleClick = () => {
    setcomment(false);
  };

  const handleSubmit = async () => {
    if (comm.trim() === "") return;
    const comt = comm;
    setcomm("");
    const chef = await fetch(
      api + "chef/search-name?name=" + getDetails().username
    );
    const cdata = await chef.json();
    const url = api + "review/";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`,
      },
      body: JSON.stringify({
        comment: comt,
        chef: cdata[0].url,
        recipe: recipe,
      }),
    });
    if (response.status >= 400) {
      return;
    }
    const data = await response.json();
    console.log(data);
    setcomment(false);
  };

  return (
    <div
      className="fixed top-1/2 -translate-y-1/2 max-sm:w-[93%] max-sm:h-auto z-30 mx-auto right-0 left-0 px-[2rem] py-[1.5rem] space-y-7 
        font-[Mona sans] w-[30rem] text-left rounded-2xl rounded-tr-none bg-white shadow-2xl"
    >
      <div
        onClick={handleClick}
        className="w-[1.5rem] h-[1.5rem] -mt-[2rem] max-sm:-mt-[2rem] max-sm:ml-[19.6rem] ml-[27rem] rounded-full 
        bg-red-400 flex justify-center items-center hover:cursor-pointer"
      >
        <FontAwesomeIcon icon={faXmark} color="white" />
      </div>
      <textarea
        onChange={(e) => handlechange(e)}
        className="resize-none w-full h-[10rem] outline-none p-5 rounded-xl shadow-inner shadow-gray-300"
        placeholder="Post your comment..."
      ></textarea>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSubmit}
        className="px-20 py-2  bg-[#0d0c22] font-semibold text-white rounded-xl mb-7"
      >
        Post
      </motion.button>
    </div>
  );
}

export default CommentTemp;
