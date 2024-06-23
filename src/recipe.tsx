import Setupbars from "./setupbars";

function Recipe() {
  return (
    <div className="py-10">
      <p className="text-4xl mb-5 font-[Forte]">Recipe's</p>
      <div className="flex flex-col w-full space-y-[2rem]">
        <Setupbars foodname="Main_Dishes" />
        <Setupbars foodname="Dessert" />
        <Setupbars foodname="Drinks" />
        <Setupbars foodname="Side Dishes" />
        <Setupbars foodname="Appatizers" />
      </div>
    </div>
  );
}

export default Recipe;
