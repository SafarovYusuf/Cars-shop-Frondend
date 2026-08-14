import AllCars from "./pages/AllCars";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CarDetail from "./pages/CarDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllCars />} />
        <Route path="/cars/:id" element={<CarDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
