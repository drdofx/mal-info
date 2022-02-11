import Home from "./pages/Home";
import Trend from "./pages/Trend";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="trend" element={<Trend />} />
        <Route
          path="*"
          element={
            <div className="p-4">
              <p>There's nothing here!</p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
