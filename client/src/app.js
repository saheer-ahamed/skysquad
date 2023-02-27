import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
// import OTP from "./pages/Auth/OTP";

function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" exact element={<Home />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/auth" exact element={<Auth />} />
          {/* <Route path="/otp" element={<OTP />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
