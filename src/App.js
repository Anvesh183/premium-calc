import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./components/common/Navbar";
import Spinner from "./components/common/Spinner";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const FireInsuranceCalculator = lazy(() =>
  import("./pages/FireInsuranceCalculator")
);
const GipsaGmcCalculator = lazy(() => import("./pages/GipsaGmcCalculator"));
const TravelInsuranceCalculator = lazy(() =>
  import("./pages/TravelInsuranceCalculator")
);

const AppLayout = () => (
  <>
    <Navbar />
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Outlet />
    </motion.main>
  </>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<LandingPage />} />
            <Route
              path="fire-insurance"
              element={<FireInsuranceCalculator />}
            />
            <Route path="gipsa-gmc" element={<GipsaGmcCalculator />} />
            <Route
              path="travel-insurance"
              element={<TravelInsuranceCalculator />}
            />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
