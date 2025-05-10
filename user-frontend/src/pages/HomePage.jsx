import Content from "../components/content/Content";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ServicePage from "./ServicePage";
import TeacherCourseManagement from "./TeacherCourseManagement";
import CourseDetailPage from "./CourseDetailPage";
import SettingsPage from "./SettingsPage";
import PaymentPage from "./PaymentPage";
import SuccessPage from "./SuccessPage";
import CoursePage from "./CoursePage";
import AboutUsPage from "./AboutUsPage";
import CourseTrialPage from "./CourseTrialPage";
import MyCoursePage from "./MyCoursePage";

function HomePage() {
  return (
    <div className="home-page-container flex flex-col w-full gap-2 bg-white">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Content />} />
          <Route path="services" element={<ServicePage />} />
          <Route path="services/:courseId" element={<CourseDetailPage />} />
          <Route path="/courses/:courseId" element={<CoursePage />} />
          <Route path="courses" element={<TeacherCourseManagement />} />
          <Route path="payment/:courseId" element={<PaymentPage />} />
          <Route path="/course-trial/:courseId" element={<CourseTrialPage />} />
          <Route path="/payment/success/:courseId" element={<SuccessPage />} />
          <Route
            path="teacher/courses/add"
            element={<TeacherCourseManagement isAdding={true} />}
          />
          <Route
            path="teacher/courses/edit/:courseId"
            element={<TeacherCourseManagement isEditing={true} />}
          />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="my-courses" element={<MyCoursePage />} />
          <Route path="about" element={<AboutUsPage />} />
          <Route path="/" element={<Content />} />
        </Route>
      </Routes>
    </div>
  );
}

export default HomePage;
