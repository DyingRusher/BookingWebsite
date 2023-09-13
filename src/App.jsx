import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index_page from "./pages/index.jsx";
import Login from "./pages/loginPage";
import Layout from "./Layout";
import Signup from "./pages/signupPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";

axios.defaults.baseURL = "http://127.0.0.1:6969";
axios.defaults.withCredentials = true;
// axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
function App() {
  return (
  
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index_page />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
          </Routes>
        </UserContextProvider>
      

  );
}

export default App;
