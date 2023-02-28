import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import OTP from "./pages/Auth/OTP";
import { Toaster } from "react-hot-toast";
import VerifyRoute from "./routes/VerifyRoute";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" exact element={<Home />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/auth" exact element={<Auth />} />
        </Route>
        <Route element={<VerifyRoute />} >
          <Route path="/otp" element={<OTP />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
