import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const api = import.meta.env.VITE_DB_API;

function Review() {
  const [ndata, setData] = useState([
    {
      chef: "User",
      comment: "",
    },
  ]);
  const [search] = useSearchParams();
  const id = search.get("id");
  // console.log(ndata);
  useEffect(() => {
    const getreview = async () => {
      const response = await fetch(api + "recipe/" + id + "/reviews");
      const data = await response.json();
      setData(data);
    };
    getreview();
  }, [search]);

  return (
    <div className="w-full text-left space-y-10 py-5 max-sm:px-4">
      <p className="text-4xl text-gray-600 font-black">Reviews</p>
      {ndata.length === 0 ? (
        <p className="font-semibold text-gray-400">
          No comments available on this post.
        </p>
      ) : (
        ndata.map((value, i) => (
          <div key={i} className="text-lg space-y-2 font-semibold">
            <p className="text-gray-400">User {i}</p>
            <p className="text-sm text-gray-500">{value.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Review;
