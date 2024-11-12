import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoutes";
import Sudoku from "../games/sodoku/Sudoku";
import Snake from "../games/Snake/Snake";
import TheGames from "../pages/TheGames";
import QuizeGame from "../games/Quize/QuizeGame";
import MathGame from "../games/Mathematics/MathGame";
import SpellingGame from "../games/SpellingGame/SpellingGame";
import Memory from "../games/Memory/Memory";
import Mole from "../games/Mole/Mole.jsx";
import Dinosaur from "../games/Dinosaur/Dinosaur.jsx";

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
            <TheGames />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sudoku"
        element={
          <ProtectedRoute>
            <Sudoku />
          </ProtectedRoute>
        }
      />
      <Route
        path="/snake"
        element={
          <ProtectedRoute>
            <Snake />
          </ProtectedRoute>
        }
      />
      <Route
        path="/quize"
        element={
          <ProtectedRoute>
            <QuizeGame />
          </ProtectedRoute>
        }
      />
      <Route
        path="/math"
        element={
          <ProtectedRoute>
            <MathGame />
          </ProtectedRoute>
        }
      />
      <Route
        path="/spelling"
        element={
          <ProtectedRoute>
            <SpellingGame />
          </ProtectedRoute>
        }
      />
      <Route
        path="/memory"
        element={
          <ProtectedRoute>
            <Memory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mole"
        element={
          <ProtectedRoute>
            <Mole />
          </ProtectedRoute>
        }
      />
      <Route
        path="/The Rolling Ball Game"
        element={
          <ProtectedRoute>
            <Dinosaur/>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default UserRoutes;
