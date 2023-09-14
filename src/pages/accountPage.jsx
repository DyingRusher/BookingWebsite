import React, { useCallback, useContext, useState } from "react";
import { userContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

function AccountPage() {
  const { user, ready ,setUser} = useContext(userContext);
    const [redirect,setRedirect] = useState(null)
  let {subpage} = useParams()
  if(subpage === undefined){
    subpage = 'profile'
  }
  if (!!ready) {
    return "Loading............................................................................................................................................................................................................................";
  }
  if (!ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

//   console.log(subpage)

  async function logout(){
    await axios.post('/logout')
    setUser(null)
    setRedirect('/login')
  }

  function ActiveClass(param = null){
    let clas =  'p-2 px-6'
    if(param == subpage || (subpage == undefined && param == 'profile')){
        clas +=' bg-search text-white rounded-full'
    }
    // console.log(clas)
    return clas
  }

  if(redirect){
    return <Navigate to={redirect}/>
  }
  return (
    <div>
      <nav className="w-full flex gap-4 justify-center mt-8">
        <Link
          className={ActiveClass('profile')}
          to={"/account"}
        >
          My Profile
        </Link>
        <Link className={ActiveClass('booking')} to={"/account/booking"}>
          My Booking
        </Link>
        <Link className={ActiveClass('places')} to={"/account/places"}>
          My Accommodation
        </Link>
      </nav>

      {subpage === 'profile' && <div className="text-center my-8 gap-4 ">
            Logged in as {user.name} {user.email}<br/>
            <button onClick={logout} className="max-w-sm rounded-full bg-search text-white my-4 p-2">Log out</button>
        </div>}
    </div>
  );
}

export default AccountPage;
