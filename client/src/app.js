import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" exact element={<Home />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/auth" element={<Auth />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
