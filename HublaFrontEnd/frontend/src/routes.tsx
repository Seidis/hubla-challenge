import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "components/ProtectedRoute";
import Header from "components/Header";

import Login from "pages/Login";
import Register from "pages/Register";
import Home from "pages/Home";
import Upload from "pages/Upload";
import Transactions from "pages/Transactions";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Header />}>
            <Route path="*" element={<Navigate to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="upload" element={<Upload />} />
            <Route path="transactions" element={<Transactions />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
