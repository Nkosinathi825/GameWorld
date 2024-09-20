import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoutes";

function UserRoutes() {
  return (
    <Routes>
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default UserRoutes;
