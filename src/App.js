import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/common/Navbar";
import LandingPage from "./pages/LandingPage";
import FireInsuranceCalculator from "./pages/FireInsuranceCalculator";
import GipsaGmcCalculator from "./pages/GipsaGmcCalculator";
import TravelInsuranceCalculator from "./pages/TravelInsuranceCalculator"; // Import the new calculator

const AppLayout = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="fire-insurance" element={<FireInsuranceCalculator />} />
          <Route path="gipsa-gmc" element={<GipsaGmcCalculator />} />
          <Route
            path="travel-insurance"
            element={<TravelInsuranceCalculator />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
