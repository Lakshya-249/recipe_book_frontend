import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import pic1 from "./assets/image2.jpg";
import pic2 from "./assets/image3.jpg";
import pic3 from "./assets/image4.avif";
import pic4 from "./assets/image5.jpg";
import pic5 from "./assets/image6.jpeg";

function Flipboard() {
  const [item, setItems] = useState("a");
  const arr: string[] = [pic1, pic2, pic3, pic4, pic5];
  const func = useMemo(() => {
    function* f(array: string[]): Generator<string, void, string> {
      let i = 0;
      while (true) {
        //   yield array[i];
        const incOrDec = (yield array[i]) === "prev" ? -1 : 1;
        i = (array.length + i + incOrDec) % array.length;
      }
    }
    return f(arr);
  }, []);
  useEffect(() => {
    const showslides = () => {
      setItems(func.next().value as string);
      setTimeout(showslides, 10000);
    };

    showslides();
  }, []);

  //   console.log(gen.next().value);
  //   console.log(gen.next().value);
  //   console.log(gen.next().value);
  //   console.log(gen.next().value);
  //   console.log(gen.next().value);

  const handleClick = (val: string) => {
    if (val === "prev") {
      setItems(func.next("prev").value as string);
    } else {
      setItems(func.next().value as string);
    }
  };

  return (
    <div>
      <div
        className="w-full h-[23rem] overflow-hidden max-sm:h-[17rem] rounded-b-2xl text-3xl
       font-bold bg-gray-300"
      >
        <motion.div
          onClick={() => handleClick("prev")}
          initial={{
            rotate: "45deg",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="border-b-4 border-l-4 w-5 h-5 hover:cursor-pointer z-20 absolute left-[2rem] top-1/3 max-sm:top-1/4"
        />
        <motion.div
          onClick={() => handleClick("next")}
          initial={{
            rotate: "-45deg",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="border-b-4 border-r-4 w-5 h-5 hover:cursor-pointer z-20 absolute right-[2rem] top-1/3 max-sm:top-1/4"
        />
        {/* {item ?? ""} */}
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          src={item}
          alt="Loading"
          className="object-cover h-[23rem] overflow-hidden rounded-b-2xl max-sm:h-[17rem] w-full"
        />
        <div
          className="z-10 text-[5rem] space-y-10 max-sm:text-[2rem] absolute max-sm:top-[9rem] 
        top-[12rem] left-0 right-0 mx-auto text-opacity-60 text-gray-300 font-extrabold"
        >
          <p>Welcome to community kitchen</p>
          <p className="text-lg font-semibold">
            Start your kitchen journey here
          </p>
        </div>
      </div>
    </div>
  );
}

export default Flipboard;
