import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index_page from "./pages/index.jsx";
import Login from "./pages/loginPage";
import Layout from "./Layout";
import Signup from "./pages/signupPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index_page />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
