import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Controller/Home";
import School from "./Controller/School";
import LoginPage from "./Utility/LoginPage";
import Backup from "./Controller/Backup";
import Dashborad from "./Controller/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Home />}>
        {/* Redirect "/" to "/dashboard" */}
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashborad />} />
        <Route path="school" element={<School />} />
        <Route path="backup" element={<Backup />} />
      </Route>
    </Routes>
  );
}

export default App;
