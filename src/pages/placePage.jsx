import { Link, Navigate, useParams } from "react-router-dom";
import Perks from "./Perks";
import { useState } from "react";
import axios from "axios";
import PhotoUploader from "./photoUploder";

export default function PlacePage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [redirect,setRedirect] = useState('');
  // console.log(action)

  function h2andp(header, para) {
    // setPerks(["sdf"])
    return (
      <>
        <h2 className="mt-5 text-2xl">{header}</h2>
        <p className="text-gray-500 text-sm">{para}</p>
      </>
    );
  }

  async function addNewPlace(ev) {
    ev.preventDefault();

    const {data:responseData } = await axios.post("/places", {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests
    });
    setRedirect("/account/place")
  }

  if(redirect){
    return <Navigate to={redirect}/>
  }
  return (
    <div>
      {action !== "new" && (
        <div className="text-center p-4 gap-4">
          <Link
            className="inline-flex gap-2 bg-search p-2 rounded-full text-white"
            to={"/account/places/new"}
          >
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}
      {action === "new" && (
        <form className="" onSubmit={addNewPlace}>
          {h2andp("Title", "This is for your place,should be short and catchy")}
          <input
            type="text"
            name=""
            placeholder="title , example : Charusat"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
          {h2andp("Address", "Address of that place")}

          <input
            type="text"
            name=""
            placeholder="Address"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
          />
          {h2andp("Photos", "more = better")}
          <PhotoUploader
            uploadedPhoto={addedPhotos}
            onChange={setAddedPhotos}
          />
          {h2andp("Description", "Description of place")}
          <textarea
            className="border rounded-xl w-full py-6"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          {h2andp("Perks", "Select all perks of your place")}
          <Perks selected={perks} onChange={setPerks} />
          {h2andp("Extra Info", "House rules,etc.")}
          <textarea
            className="w-full p-6 border rounded-xl"
            value={extraInfo}
            onChange={(ev) => setExtraInfo(ev.target.value)}
          />
          <h2 className="text-xl mt-4">Check in and Check out</h2>
          <p className="text-sm text-gray-500">
            Remember to have time window for room cleaning
          </p>
          <div className="flex grid sm:grid-cols-3 gap-2">
            <div className="mt-2 -mb-1">
              <h3>Check in time</h3>
              <input
                type="text"
                placeholder="14:00"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              />
            </div>
            <div className="mt-2 -mb-1">
              <h3>Check out time</h3>
              <input
                type="text"
                placeholder="21:00"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>
            <div className="mt-2 -mb-1">
              <h3>Max. guests</h3>
              <input
                type="number"
                placeholder="5"
                value={maxGuests}
                onChange={(ev) => setMaxGuests(ev.target.value)}
              />
            </div>
          </div>

          <button className="bg-search rounded-full text-white mt-4 h-8 max-w-2xl ">
            Save
          </button>
        </form>
      )}
    </div>
  );
}
