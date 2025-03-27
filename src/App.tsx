import { Suspense, useEffect, lazy } from "react";
import { useRoutes, Routes, Route, useNavigate } from "react-router-dom";
import Preloader from "@/components/common/Preloader";
import Home from "./components/home";
import routes from "tempo-routes";

// Lazy load pages
const Features = lazy(() => import("./pages/features"));
const Pricing = lazy(() => import("./pages/pricing"));
const Help = lazy(() => import("./pages/help"));
const Login = lazy(() => import("./pages/login"));
const Signup = lazy(() => import("./pages/signup"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const MyLinks = lazy(() => import("./pages/mylinks"));

function App() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const hostname = window.location.hostname;
    if (hostname === 'help.salink.me') {
      navigate('/help');
    }
  }, [navigate]);
  
  return (
    <Suspense fallback={<Preloader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/help" element={<Help />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mylinks" element={<MyLinks />} />
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </Routes>
    </Suspense>
  );
}

export default App;
