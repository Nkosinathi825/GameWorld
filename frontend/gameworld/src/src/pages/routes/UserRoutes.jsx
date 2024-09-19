import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../Dashboard";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/Dashboard" element={<Dashboard/>} />
    </Routes>
  );
}

export default UserRoutes;
