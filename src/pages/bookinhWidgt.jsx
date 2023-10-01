import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../UserContext";
export default function BookingWidgt({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [noGuest, setNoGuest] = useState(1);
  const [fullName, setFullName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [redirect, setRedirect] = useState("");
  const [prizeHotel, setPrizeHotel] = useState("");
  const {user} = useContext(userContext)

  useEffect(()=>{
    setFullName(user.name)

  },[user])

  
  let numberofNight = 0;
  if (checkIn && checkOut) {
    numberofNight = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
    // setPrizeHotel(numberofNight * place.prize);
  }

  async function handelBooking() {
    const data = {
      checkIn,
      checkOut,
      noGuest,
      fullName,
      phoneNo,
      place: place._id,
      prizeHotel:numberofNight * place.prize,
    };
    const res = await axios.post("booking", data);
    const bookingId = res.data._id;
    setRedirect(`/account/booking/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <div className="shadow p-4 rounded-2xl bg-gray-300">
        <div className="text-2xl text-center">
          Price : ${place.price}/per night
        </div>
        <div className="border rounded-2xl mb-4">
          <div className="flex">
            <div className="border text-center rounded-2xl m-2">
              <label>Check-in:</label>{" "}
              <input
                value={checkIn}
                onChange={(ev) => {
                  setCheckIn(ev.target.value);
                }}
                className="bg-gray-300 p-1 mt-2"
                type="date"
              />
              <br />
            </div>
            <div className="border text-center rounded-2xl m-2">
              <label>Check-out:</label>{" "}
              <input
                value={checkOut}
                onChange={(ev) => {
                  setCheckOut(ev.target.value);
                }}
                className="bg-gray-300 p-1 mt-2"
                type="date"
              />
              <br />
            </div>
          </div>
          <br />
          <div className=" rounded-2xl mb-4 p-2">
            <label>Number of Guest:</label>{" "}
            <input
              value={noGuest}
              onChange={(ev) => {
                setNoGuest(ev.target.value);
              }}
              className="bg-gray-300 p-1"
              type="number"
            />
            <br />
          </div>
          {numberofNight > 0 && (
            <div>
              <div className=" rounded-2xl mb-4 px-2">
                <div className="">
                  <label>Your full name:</label>{" "}
                  <input
                    value={fullName}
                    onChange={(ev) => {
                      setFullName(ev.target.value);
                    }}
                    className="bg-gray-300 p-1 mb-4"
                    type="text"
                  />
                </div>
                <br />
                <label>Your Phone number:</label>{" "}
                <input
                  value={phoneNo}
                  onChange={(ev) => {
                    setPhoneNo(ev.target.value);
                  }}
                  className="bg-gray-300 p-1"
                  type="tel"
                />
              </div>
            </div>
          )}
        </div>
        <button onClick={handelBooking} className="loginBtn">
          {numberofNight <= 0 && <div>Book hotel</div>}{" "}
          {numberofNight > 0 && (
            <span>Book This hotel for $:{numberofNight * place.price}</span>
          )}{" "}
        </button>
      </div>
    </div>
  );
}
