import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index_page from "./pages/index.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index_page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
