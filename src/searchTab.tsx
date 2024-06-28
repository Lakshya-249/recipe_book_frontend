import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const api = import.meta.env.VITE_DB_API;

function SearchTab() {
  const [isVisible, setvis] = useState(false);
  const [searchItem, setSearch] = useState([{ name: "", title: "" }]);
  const handleClick = () => {
    setSearch([]);
    setvis(!isVisible);
  };

  const debounce = (cb: (word: any) => void, delay: number = 1000) => {
    return (...args: [string]) => {
      setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };

  const handleupdate = debounce(async (text) => {
    const url = api + "search?name=" + text;
    const response = await fetch(url);
    const data = await response.json();
    setSearch(data);
    // console.log(text);
  });

  const handleChange = (e: any) => {
    handleupdate(e.target.value);
    // console.log(e.target.value);
  };
  const navigate = useNavigate();

  const handleSearch = (text: string) => {
    // console.log(e);
    if (
      [
        "Main_Dishes",
        "Dessert",
        "Drinks",
        "Side Dishes",
        "Appatizers",
      ].includes(text)
    ) {
      navigate("/category?name=" + text);
      return;
    }
    navigate("/search?name=" + text);
  };
  return (
    <div className="relative">
      <div className="py-2 px-3 space-x-2 text-gray-500 rounded-full bg-gray-200 border-4 border-black hover:border-blue-200 cursor-pointer">
        <FontAwesomeIcon
          onClick={handleClick}
          icon={faMagnifyingGlass}
          size="sm"
          color="gray"
        />
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.input
              onChange={(e) => handleChange(e)}
              className="bg-inherit outline-none origin-right"
              variants={{
                initial: {
                  scaleX: 0,
                },
                flip: {
                  scaleX: 1,
                },
              }}
              initial="initial"
              animate="flip"
              transition={{
                duration: 1,
                type: "spring",
              }}
              exit="initial"
              placeholder="Search food items..."
            />
          )}
        </AnimatePresence>
      </div>
      <div
        className="cont absolute top-[3.1rem] max-sm:top-[3.5rem] rounded-b-xl text-black w-full 
      space-y-2 border-[1px] border-black overflow-y-auto max-h-[10rem] bg-white"
      >
        {searchItem.map((item, i) => (
          <p
            className="hover:cursor-pointer py-1"
            onClick={() => handleSearch(item.name || item.title)}
            key={i}
          >
            {item.name || item.title}
          </p>
        ))}
      </div>
    </div>
  );
}

export default SearchTab;
