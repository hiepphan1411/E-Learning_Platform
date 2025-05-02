import Content from "../components/content/Content";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import CoursePage from "./CoursePage";

function HomePage() {
  return (
    <div className="home-page-container flex flex-col w-full gap-2 bg-white">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Content />} />
          <Route path="services" element={<CoursePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default HomePage;
