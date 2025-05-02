import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

function Layout() {
  return (
    <div className="flex flex-col gap-2">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
