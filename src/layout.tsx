import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import Header2 from "./header2";

function Layout() {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <Header />
      <Header2 />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
