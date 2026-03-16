import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SuperAdminLogin from "./pages/SuperAdminLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/superadmin" element={<SuperAdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
