import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SettingTemp from "./settingTemp";
import { getDetails } from "./utils/authentication";

const api = import.meta.env.VITE_DB_API;

function ProfilePage() {
  const [isShow, setShow] = useState(false);
  const [r_id, setid] = useState(1);
  const [recipes, setrecipes] = useState([
    {
      category: "http://localhost:8000/api/category/5/",
      chef: "http://localhost:8000/api/chef/12/",
      image: "",
      ingrediants: "ascsvdsv svdsv\n'ds\nv\ndsv\nds\ndvdvs\nadvs",
      recipe_id: 12,
      steps:
        "xcvdxvdsvdszn vjds  vad v a 'mms\nsmV;\ndsLM\nsmvMV\nmMm'\nm\n\"M\"MV",
      title: "sassvsvasv",
      url: "http://localhost:8000/api/recipe/12/",
    },
  ]);

  // const url =
  //   "https://res.cloudinary.com/dki83hf3c/image/upload/v1719089226/Nfolder/r7n9ouf4tyxbzw8vo09n.jpg";
  useEffect(() => {
    const getrecipe = async () => {
      const res = await fetch(
        api + "chef/search-rname?name=" + getDetails().username
      );
      const data = await res.json();
      // console.log(data);
      setrecipes(data);
    };
    getrecipe();
  }, []);

  const handleClick = (word: number) => {
    setShow(!isShow);
    setid(word);
  };
  return (
    <div className="w-[70%] mx-auto max-sm:w-full my-10 flex flex-col items-center">
      <div className="w-full h-3 border-b-2"></div>
      <div className="w-[6rem] mx-auto -mt-[3rem] h-[6rem] flex rounded-full justify-center items-center bg-white">
        <div
          className="w-[4rem] h-[4rem] flex justify-center items-center 
          text-2xl font-bold text-white rounded-full bg-[#0d0c22]"
        >
          {getDetails().username[0].toUpperCase()}
        </div>
      </div>
      <div className="space-y-5">
        <p className="text-xl font-semibold">{getDetails().username}</p>
        <p className="font-light">Your Posts</p>
      </div>
      <div className="w-full flex justify-center flex-wrap">
        {recipes.map((value, i) => {
          return (
            <motion.div
              onClick={() => handleClick(value.recipe_id)}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.5 }}
              whileHover={{
                opacity: 1,
                transition: {
                  delay: 0.1,
                  ease: "easeInOut",
                },
              }}
              transition={{ delay: i * 0.2, ease: "easeInOut" }}
              key={i}
              className="relative w-[20rem] max-sm:w-full text-5xl font-black text-gray-400 text-opacity-55 
              hover:cursor-pointer origin-left h-[20rem] rounded-2xl m-4 bg-gray-300"
            >
              <img
                src={value.image}
                alt="No Content available"
                className="h-full w-full rounded-2xl object-cover"
              />
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 mx-auto z-50">
                {value.title}
              </div>
            </motion.div>
          );
        })}
      </div>
      {isShow ? <SettingTemp rid={r_id} setshow={setShow} /> : ""}
    </div>
  );
}

export default ProfilePage;
