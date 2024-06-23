import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Review from "./review";
import Setupbars from "./setupbars";
import LoginTemplate from "./loginTemplate";
import CommentTemp from "./commentTemp";
import { getToken } from "./utils/authentication";
import { useSearchParams } from "react-router-dom";

const api = import.meta.env.VITE_DB_API;

function RecipeSteps() {
  const [islog, setlog] = useState(false);
  const [isreview, setreview] = useState(false);
  const [user, setuser] = useState("");
  const [details, setdetails] = useState({
    category: "http://localhost:8000/api/category/5/",
    chef: "http://localhost:8000/api/chef/12/",
    image: "",
    ingrediants:
      "1 cup sugar\n1 cup salt\n1 spoon baked powder\n1 cup Pepper\n4 spoon Mint\n3 cup Turmeric\n1 spoon honey",
    recipe_id: 12,
    steps:
      "Having a well-designed website with useful information gives off the impression that you are running a " +
      "reliable and credible business.Meet our new concept of a design studios corporate website!" +
      "\nThe first screen displays the companys motto. The next two screens display the company description" +
      "and a list of its services. Another screen displays the list of the team members and their responsibilities. " +
      "The last screen displays the contact information.\nOur designers used neutral grey shades for the background and added" +
      "blurry gradients as the main colorful accent. This simple color scheme doesn’t distract users from observing the company’s" +
      "portfolio.\nThe minimal design, large print, and colorful accents convey the company’s mission and emphasize " +
      "its creativity. The simple navigation and clear information layout make the website pleasant touse.",
    title: "sassvsvasv",
    url: "http://localhost:8000/api/recipe/12/",
  });

  const [search] = useSearchParams();
  const id = search.get("id");
  useEffect(() => {
    const getrecipe = async () => {
      const response = await fetch(api + "recipe/" + id);
      const data = await response.json();
      // console.log(data);
      if (data.detail) return;
      setdetails(data);
      const chef = await fetch(data.chef);
      const data2 = await chef.json();
      setuser(data2.username);
    };
    getrecipe();
  }, []);

  const handleClick = () => {
    const check = getToken();
    if (check === "none") setlog(!islog);
    else setreview(!isreview);
  };
  return (
    <div className="w-[70%] max-sm:w-full text-left mx-auto font-[Mona sans]">
      <div className="w-full">
        <div
          className="w-full sticky z-20 top-0 flex max-sm:text-xs font-semibold mb-10 max-sm:px-4 
        text-sm justify-between py-4 bg-white items-end"
        >
          <div className="flex items-center space-x-5">
            <div className="w-[3rem] h-[3rem] max-sm:w-[2rem] max-sm:h-[2rem] rounded-full bg-gray-200"></div>
            <div className="space-y-1 max-sm:w-[10rem]">
              <p className=" max-sm:text-wrap">{user}</p>
              <p className="text-xs text-green-600">
                <FontAwesomeIcon icon={faCircle} fade size="xs" color="green" />
                &nbsp; Steps for Recipe{" "}
                <span className="text-gray-500">Follow</span>
              </p>
            </div>
          </div>
          <div
            onClick={handleClick}
            className="w-[2.5rem] h-[2.5rem] hover:cursor-pointer max-sm:w-[1.7rem] max-sm:h-[1.7rem] border-[1px] flex justify-center items-center rounded-full"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </div>
        </div>
        <p className="text-3xl max-sm:px-4 font-bold mb-5">{details.title}</p>
        <div className="w-full h-[24rem] bg-black max-sm:h-auto max-sm:rounded-none mb-10 rounded-xl max-sm:text-[5rem] text-[7rem] font-bold text-center text-white text-opacity-60">
          <img
            src={details.image}
            alt="Image Loading"
            className="w-full object-cover h-full max-sm:rounded-none rounded-xl"
          />
        </div>
        <div className="w-full max-sm:w-full max-sm:px-5 mx-auto text-xl mb-10 space-y-10">
          <div className="space-y-5">
            <p className="text-5xl font-bold">Ingredients</p>
            <ul>
              {details.ingrediants.split("\n").map((ingred, i) => (
                <li key={i}>{ingred}</li>
              ))}
            </ul>
          </div>
          <p className="text-5xl font-bold">Steps:-</p>
          {details.steps.split("\n").map((step, i) => (
            <p key={i}>{step}</p>
          ))}
        </div>
        <div className="my-[5rem] text-center">
          <div>
            <div className="w-full h-3 border-b-2"></div>
            <div className="w-[6rem] mx-auto -mt-[3rem] h-[6rem] flex rounded-full justify-center items-center bg-white">
              <div className="w-[4rem] h-[4rem] rounded-full bg-[#0d0c22]"></div>
            </div>
          </div>
          <div className="space-y-5">
            <p className="text-xl font-semibold">We hope you liked it</p>
            <p className="font-light">Thank you</p>
          </div>
        </div>
        <div className="w-full mb-10 space-y-5">
          <Setupbars foodname="More_by_Online_Kitchen" />
        </div>
      </div>
      <Review />
      {islog ? <LoginTemplate word={"comment"} setlogin={setlog} /> : ""}
      {isreview ? (
        <CommentTemp recipe={details.url} setcomment={setreview} />
      ) : (
        ""
      )}
    </div>
  );
}

export default RecipeSteps;
