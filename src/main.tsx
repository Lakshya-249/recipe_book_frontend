import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./mainsignup.tsx";
import Signin from "./mainsignin.tsx";
import Layout from "./layout.tsx";
import Content from "./content.tsx";
import Recipe from "./recipe.tsx";
import RecipeSteps from "./recipeSteps.tsx";
import AddRecipe from "./addRecipe.tsx";
import ProfilePage from "./profilePage.tsx";
import CategoryPage from "./categoryPage.tsx";
import UpdatePage from "./updatePage.tsx";
import SearchPage from "./searchPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Signin /> },
      {
        path: "",
        element: <Layout />,
        children: [
          {
            path: "",
            element: <Content />,
          },
          {
            path: "recipe",
            element: <Recipe />,
          },
          {
            path: "rsteps",
            element: <RecipeSteps />,
          },
          {
            path: "addrecipe",
            element: <AddRecipe />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "category",
            element: <CategoryPage />,
          },
          {
            path: "update",
            element: <UpdatePage />,
          },
          {
            path: "search",
            element: <SearchPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
