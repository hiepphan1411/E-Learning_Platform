import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Breadcrumb from "../navigation/Breadcrumb";
import Navbar from "../navbar/Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
