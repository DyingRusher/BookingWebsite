import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index_page from "./pages/index.jsx";
import Login from "./pages/loginPage";
import Layout from "./Layout";
import Signup from "./pages/signupPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import AccountPage from "./pages/accountPage";
import PlaceViewPage from "./pages/placeViewPage";
import BookingPage from "./pages/bookingPage";
import BookingsPage from "./pages/bookingsPage";

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
              {/* <Route path ='/account/bookings' element={<BookingsPage/>}/>
              <Route path="/account/booking/:id" element={<BookingPage/>}/> */}
              <Route path="/account/:subpage?" element={<AccountPage/>}/>
              <Route path="/account/:subpage/:action" element={<AccountPage/>}/>
              <Route path='/place/:id' element={<PlaceViewPage/>}/>
              
            </Route>
          </Routes>
        </UserContextProvider>
      

  );
}

export default App;
