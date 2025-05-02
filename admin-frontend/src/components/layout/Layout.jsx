import { Outlet } from "react-router-dom";
import { useTitle } from "../../hooks/TitleProvider";
import Header from "../commons/Header";
import Sidebar from "../commons/Sidebar";

export default function Layout() {
  const { title } = useTitle();
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title={title} />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
