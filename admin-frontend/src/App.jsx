import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { TitleProvider } from "./hooks/TitleProvider";
import OverviewPage from "./pages/OverviewPage";
import CoursesPage from "./pages/CoursesPage";
import SalesPage from "./pages/SalesPage";
import CertificatesPage from "./pages/CertificatesPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingPage from "./pages/SettingPage";
import UsersPage from "./pages/UsersPage";

function App() {
  return (
    <BrowserRouter>
      <TitleProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="overview" element={<OverviewPage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="sales" element={<SalesPage />} />
            <Route path="certificates" element={<CertificatesPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="setting" element={<SettingPage />} />
          </Route>
        </Routes>
      </TitleProvider>
    </BrowserRouter>
  );
}

export default App;
