import { Route, Routes, BrowserRouter } from "react-router-dom";
import Dashboard from "../Components/Dashboard";
import RegistrationForm from "../Components/RegistrationForm";
import NavBar from "../Components/NavBar";
const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
