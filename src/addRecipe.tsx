import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getDetails, getToken } from "./utils/authentication";
import { motion } from "framer-motion";

const api = import.meta.env.VITE_DB_API;

const AddRecipe = () => {
  // const [hfile, setfile] = useState(false);
  const [details, setdetails] = useState<{
    [title: string]: string;
    image: string;
    ingrediants: string;
    steps: string;
    chef: string;
    category: string;
  }>({
    title: "",
    image: "",
    ingrediants: "",
    steps: "",
    chef: "",
    category: "",
  });
  const [field, setfield] = useState(false);
  useEffect(() => {
    const change = () => {
      for (let i in details) {
        // console.log(i);
        if (details[i].trim() === "") {
          // console.log(details);
          return;
        }
      }
      setfield(true);
    };
    change();
  }, [details]);
  const [preview, setpreview] = useState("");
  // console.log(preview);
  const setData = (e: any) => {
    setdetails({ ...details, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    prieviewFile(file);
  };

  const prieviewFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setpreview(reader.result as string);
    };
  };

  useEffect(() => {
    const setuser = async () => {
      const response = await fetch(
        api + "chef/search-name?name=" + getDetails().username
      );
      const data = await response.json();
      setdetails({ ...details, chef: data[0].url });
      // console.log(details.chef);
    };
    setuser();
  }, []);

  const url = "https://api.cloudinary.com/v1_1/dki83hf3c/image/upload";

  const handleCategoryChange = async (e: any) => {
    const url2 = api + "category/search-cat?name=" + e.target.value;
    const category = await fetch(url2);
    const data = await category.json();
    if (data.length === 0) {
      const response = await fetch(api + "category/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: e.target.value,
        }),
      });
      const data2 = await response.json();
      // console.log(data2);
      setdetails({ ...details, category: data2.url });
    } else {
      // console.log(data);
      setdetails({ ...details, category: data[0].url });
    }
    // console.log(details.category);
  };

  const handleFile = async (e: any) => {
    const file = e.target.files[0];
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("upload_preset", "nse3sosd");
    const response = await fetch(url, {
      method: "POST",
      body: formdata,
    });
    const data = await response.json();
    // console.log(data);
    setdetails({ ...details, image: data.secure_url });
    // console.log(data.secure_url);
    // setfile(true);
  };

  const handleClick = async () => {
    // if (!hfile) {
    //   await ;
    // }
    // while (!field) continue;
    if (field) {
      // console.log(details);
      setfield(false);
      const response = await fetch(api + "crecipe/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + getToken(),
        },
        body: JSON.stringify(details),
      });
      if (response.status >= 400) {
        return;
      }
      const data = await response.json();
      // console.log(data);
      navigate("/rsteps?id=" + data.recipe_id);
    }
    // else {
    //   console.log(details);
    // }
  };
  return (
    <div className="flex flex-col items-stretch w-full px-10 py-6 font-sans">
      <div className="w-[50%] self-center text-left text-pretty max-sm:w-full">
        <p className="text-[2.5rem] font-black mb-3">Welcome!</p>
        <p className="text-md font-semibold text-gray-500 mb-8">
          Let others get to Know you recipe
        </p>
        <p className="text-xl font-bold mb-6">Add an pic of your food</p>
        <div className="flex space-x-10 mb-[3rem] max-sm:flex-wrap max-sm:space-x-0">
          <div className="flex justify-center items-center w-[10rem] h-[10rem] overflow-hidden border-gray-300 rounded-full border-dashed border-2">
            {preview ? (
              <img src={preview} alt="image" className="w-[50rem]" />
            ) : (
              <FontAwesomeIcon
                icon={faCamera}
                size="lg"
                style={{ color: "#bfbfbf" }}
              />
            )}
          </div>
          <div className="mt-5 max-sm:mt-8 space-y-7">
            <label
              htmlFor="photo"
              className="font-bold text-sm border-gray-150 rounded-xl border-2 px-5 py-2 hover:cursor-pointer"
            >
              Choose image
            </label>
            <input
              type="file"
              onChange={(e) => {
                handleFileInputChange(e);
                handleFile(e);
              }}
              name="photo"
              id="photo"
              className="hidden"
            />
          </div>
        </div>
        <select
          onChange={(e) => handleCategoryChange(e)}
          defaultValue=""
          className="form-select mt-1 block mb-10 text-sm font-semibold text-gray-500 w-full px-3 py-2 
          border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="Main_Dishes">Main Dish</option>
          <option value="Appatizers">Appetizer</option>
          <option value="Drinks">Drinks</option>
          <option value="Dessert">Dessert</option>
          <option value="Side Dishes">Side Dishes</option>
        </select>
        <p className="text-xl font-bold mb-5">Add your Title</p>
        <input
          type="text"
          name="title"
          className="w-full outline-none border-b-2 border-gray-200 py-2 placeholder:font-semibold mb-10"
          placeholder="Enter title"
          onChange={(e) => setData(e)}
        />
        <textarea
          cols={30}
          name="ingrediants"
          rows={10}
          onChange={(e) => setData(e)}
          className="w-full shadow-inner resize-none p-4 shadow-gray-300 mb-5 h-[10rem] rounded-xl"
          placeholder="List Ingredients & use ';' before starting next line..."
        ></textarea>
        <textarea
          cols={30}
          rows={10}
          name="steps"
          onChange={(e) => setData(e)}
          className="w-full shadow-inner resize-none p-4 shadow-gray-300 mb-10 rounded-xl"
          placeholder="Write Steps & use ';' before starting next line..."
        ></textarea>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className={`px-20 py-2  ${
            field ? "bg-[#0d0c22]" : "bg-[#2e2b56]"
          } font-semibold text-white rounded-xl mb-7`}
        >
          Upload
        </motion.button>
      </div>
    </div>
  );
};

export default AddRecipe;
