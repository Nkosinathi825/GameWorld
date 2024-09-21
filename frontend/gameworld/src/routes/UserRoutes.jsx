import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoutes";
import Sudoku from "../games/sodoku/Sudoku";
import TheGames from "../pages/TheGames";

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
         <Route 
        path="/thegame" 
        element={
          <ProtectedRoute>
            <TheGames/>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/s" 
        element={
          <ProtectedRoute>
            <Sudoku/>
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default UserRoutes;
