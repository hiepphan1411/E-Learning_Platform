import Content from "../components/content/Content";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import CoursePage from "./CoursePage";
import ServicePage from "./ServicePage";
import TeacherCourseManagement from "./TeacherCourseManagement";
import SettingsPage from "./SettingsPage";

function HomePage() {
  return (
    <div className="home-page-container flex flex-col w-full gap-2 bg-white">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Content />} />
          <Route path="services" element={<ServicePage />} />
          <Route path="services/:courseId" element={<CoursePage />} />
          <Route path="courses" element={<TeacherCourseManagement />} />
          <Route path="teacher/courses" element={<TeacherCourseManagement />} />
          <Route path="teacher/courses/add" element={<TeacherCourseManagement isAdding={true} />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="teacher/courses/edit/:courseId" element={<TeacherCourseManagement isEditing={true} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default HomePage;
