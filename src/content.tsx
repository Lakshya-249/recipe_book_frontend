import Flipboard from "./flipboard";
import Setupbars from "./setupbars";

function Content() {
  return (
    <div className="w-full space-y-[2rem]">
      <Flipboard />
      <Setupbars foodname="Recent_Dishes" />
      {/* <Setupbars foodname="Specials" /> */}
    </div>
  );
}

export default Content;
