import Content from "../components/content/Content";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";

function HomePage() {
  return (
    <div className="home-page-container flex flex-col w-full gap-2 bg-white">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Content />} />
        </Route>
      </Routes>
    </div>
  );
}

export default HomePage;
