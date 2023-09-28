import React, { useCallback, useContext, useState } from "react";
import { userContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacePage from "./placePage";

function AccountPage() {
  const { user, ready, setUser } = useContext(userContext);
  const [redirect, setRedirect] = useState(null);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }
  if (!ready) {
    return "Loading............................................................................................................................................................................................................................";
  }
  if (!ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  //   console.log(subpage)

  async function logout() {
    await axios.post("/logout");
    setUser(null);
    setRedirect("/login");
  }

  function ActiveClass(param = null) {
    let clas = "inline-flex gap-1 p-2 px-6 rounded-full ";
    if (param == subpage || (subpage == undefined && param == "profile")) {
      clas += " bg-search text-white ";
    }else{
      clas += " bg-gray-200 "
    }
    // console.log(clas)
    return clas;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <nav className="w-full flex gap-4 justify-center mt-8">
        <Link className={ActiveClass("profile")} to={"/account"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          My Profile
        </Link>
        <Link className={ActiveClass("booking")} to={"/account/booking"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
            />
          </svg>
          My Booking
        </Link>
        <Link className={ActiveClass("places")} to={"/account/places"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
            />
          </svg>
          My Accommodation
        </Link>
      </nav>

      {subpage === "profile" && (
        <div className="text-center my-8 gap-4 ">
          Logged in as {user.name} {user.email}
          <br />
          <button
            onClick={logout}
            className="max-w-sm w-full rounded-full bg-search text-white my-4 p-2"
          >
            Log out
          </button>
        </div>
      )}

      {subpage === "places" && <PlacePage />}
    </div>
  );
}

export default AccountPage;
