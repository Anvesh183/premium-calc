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
import Footer from "./components/common/Footer";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const FireInsuranceCalculator = lazy(() =>
  import("./pages/FireInsuranceCalculator")
);
const GipsaGmcCalculator = lazy(() => import("./pages/GipsaGmcCalculator"));
const TravelInsuranceCalculator = lazy(() =>
  import("./pages/TravelInsuranceCalculator")
);

// Health Pages
const HealthInsuranceLandingPage = lazy(() =>
  import("./pages/HealthInsuranceLandingPage")
);
const FloaterMediclaimCalculator = lazy(() =>
  import("./pages/FloaterMediclaimCalculator")
);
const NewIndiaMediclaimCalculator = lazy(() =>
  import("./pages/NewIndiaMediclaimCalculator")
);
const YuvaBharatCalculator = lazy(() => import("./pages/YuvaBharatCalculator"));

// Motor Pages
const MotorInsuranceLandingPage = lazy(() =>
  import("./pages/MotorInsuranceLandingPage")
);
const PrivateCarCalculator = lazy(() =>
  import("./pages/motor-insurance/PrivateCarCalculator")
);
const TwoWheelerCalculator = lazy(() =>
  import("./pages/motor-insurance/TwoWheelerCalculator")
);

const AppLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <motion.main
      className="flex-grow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Outlet />
    </motion.main>
    <Footer />
  </div>
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

            {/* Health Hub and Calculators */}
            <Route path="health" element={<HealthInsuranceLandingPage />} />
            <Route
              path="floater-mediclaim"
              element={<FloaterMediclaimCalculator />}
            />
            <Route
              path="new-india-mediclaim"
              element={<NewIndiaMediclaimCalculator />}
            />
            <Route path="yuva-bharat" element={<YuvaBharatCalculator />} />

            {/* Motor Hub and Calculators */}
            <Route path="motor" element={<MotorInsuranceLandingPage />} />
            <Route
              path="motor/private-car"
              element={<PrivateCarCalculator />}
            />
            <Route
              path="motor/two-wheeler"
              element={<TwoWheelerCalculator />}
            />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
