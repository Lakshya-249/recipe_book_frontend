import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const api = import.meta.env.VITE_DB_API;

function SearchPage() {
  const [location] = useSearchParams();
  const navigate = useNavigate();
  const category = location.get("name");
  console.log(category);
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

  useEffect(() => {
    const getrecipe = async () => {
      const res = await fetch(api + "search?name=" + category);
      const data = await res.json();
      // console.log(data);
      setrecipes(data);
    };
    getrecipe();
  }, []);

  return (
    <div className="w-full px-[2rem] text-left py-[2rem] max-sm:px-5 space-y-2 text-sm font-semibold">
      <p className="text-xl font-semibold font-mono">{category}</p>
      <div className="w-full flex flex-wrap">
        {recipes.map((value, i) => {
          return (
            <motion.div
              onClick={() => navigate("/rsteps?id=" + value.recipe_id)}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.5 }}
              whileHover={{
                opacity: 1,
                transition: {
                  delay: 0.1,
                  ease: "easeInOut",
                },
              }}
              key={i}
              className="relative w-[20rem] max-sm:w-full hover:cursor-pointer text-center text-5xl origin-left h-[20rem] 
                rounded-2xl mb-4 mr-4 overflow-clip bg-gray-200 font-black text-gray-400 text-opacity-55"
            >
              <img
                src={value.image}
                alt="No Content Available"
                className="h-full w-full rounded-2xl object-cover"
              />
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 mx-auto z-50">
                {value.title}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchPage;
