import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TeacherCourseManagement from "./pages/TeacherCourseManagement";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
  <>
    <SettingsPage />
  </>
  );
}

export default App;
