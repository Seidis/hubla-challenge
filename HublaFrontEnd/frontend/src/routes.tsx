import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "pages/Login";
import Register from "pages/Register";
import Default from "pages/Default";
import ProtectedRoute from "components/ProtectedRoute";
import Header from "components/Header";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Header />}>
            <Route path="home" element={<Default />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
