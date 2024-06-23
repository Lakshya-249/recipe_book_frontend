import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { getToken } from "./utils/authentication";

const api = import.meta.env.VITE_DB_API;

function SettingTemp({
  rid,
  setshow,
}: {
  rid: number;
  setshow: (bl: boolean) => void;
}) {
  const handleClick = () => {
    setshow(false);
  };
  const navigate = useNavigate();
  const handleDelete = async () => {
    const response = await fetch(api + "crecipe/" + rid + "/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + getToken(),
      },
    });
    const data = await response.json();
    console.log(data);
  };
  return (
    <div
      className="fixed top-1/2 -translate-y-1/2 max-sm:w-[93%] max-sm:h-auto z-30 mx-auto right-0 left-0 px-[2rem] py-[1.5rem] space-y-4 
    font-[Mona sans] w-[25rem] text-left rounded-2xl rounded-tr-none bg-white shadow-2xl"
    >
      <div
        onClick={handleClick}
        className="w-[1.5rem] h-[1.5rem] -mt-[2rem] max-sm:-mt-[2rem] max-sm:ml-[19.6rem] ml-[22rem] rounded-full 
    bg-red-400 flex justify-center items-center hover:cursor-pointer"
      >
        <FontAwesomeIcon icon={faXmark} color="white" />
      </div>

      <button
        onClick={() => navigate("/rsteps?id=" + rid)}
        className="py-4 px-5 rounded-full w-full text-sm font-semibold border-[1px]"
      >
        View
      </button>
      <button
        onClick={() => navigate("/update?id=" + rid)}
        className="py-4 px-5 rounded-full w-full bg-[#0d0c22] text-white text-sm font-semibold border-[1px]"
      >
        Update
      </button>

      <button
        onClick={handleDelete}
        className="py-4 px-5 bg-red-600 text-white rounded-full w-full text-sm font-semibold border-[1px]"
      >
        Delete
      </button>
    </div>
  );
}

export default SettingTemp;
