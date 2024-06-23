import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const api = import.meta.env.VITE_DB_API;

function Setupbars({ foodname }: { foodname: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNext, setDisableNext] = useState(false);
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
      const res = await fetch(api + "category/search-rcat?name=" + foodname);
      if (res.status >= 400) return;
      const data = await res.json();
      // console.log(data);
      setrecipes(data);
    };
    getrecipe();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const { scrollWidth, clientWidth } = containerRef.current;
      setDisableNext(scrollWidth <= clientWidth);
    }
  });

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setDisablePrev(scrollLeft <= 0);
      setDisableNext(scrollLeft + clientWidth >= scrollWidth);
    }
  };

  const scrollNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const scrollPrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };
  const navigate = useNavigate();
  return (
    <div id="recipe_id">
      <div className="w-full px-5 h-[20rem] max-sm:h-[15rem] text-left relative">
        <p
          onClick={() => navigate("/category?name=" + foodname)}
          className="text-xl font-semibold font-mono hover:cursor-pointer"
        >
          {foodname}
        </p>
        <div
          className="cont overflow-x-auto space-x-4 flex w-full h-full"
          ref={containerRef}
          onScroll={handleScroll}
        >
          {recipes.map((value, i) => (
            <div key={i}>
              <motion.div
                onClick={() => {
                  document.body.scrollTop = 0;
                  document.documentElement.scrollTop = 0;
                  navigate("/rsteps?id=" + value.recipe_id);
                }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="relative z-10 w-[20rem]  hover:cursor-pointer text-center text-5xl origin-left 
                h-full rounded-2xl mb-4 mr-4 bg-gray-200 font-black text-gray-400 text-opacity-55"
                whileHover={{ width: "30rem" }}
              >
                <img
                  src={value.image}
                  alt="No Conetent Available"
                  className="h-full w-full rounded-2xl object-cover"
                />
                <div className="absolute w-full top-1/2 -translate-y-1/2 left-0 right-0 mx-auto z-50">
                  {value.title}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
        <button
          className={`absolute top-1/2 left-2 transform z-20 -translate-y-1/2 p-3.5  rounded-full shadow-md ${
            disablePrev ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={scrollPrev}
          disabled={disablePrev}
        >
          <motion.div
            initial={{
              rotate: "45deg",
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="border-b-4 border-l-4 w-5 h-5 hover:cursor-pointer border-white"
          />
        </button>
        <button
          className={`absolute top-1/2 right-2 transform z-20 -translate-y-1/2 p-3.5 rounded-full shadow-md ${
            disableNext ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={scrollNext}
          disabled={disableNext}
        >
          <motion.div
            initial={{
              rotate: "-45deg",
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="border-b-4 border-r-4 w-5 h-5 hover:cursor-pointer border-white"
          />
        </button>
      </div>
    </div>
  );
}

export default Setupbars;
