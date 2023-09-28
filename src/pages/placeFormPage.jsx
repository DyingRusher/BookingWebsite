import { useEffect, useState } from "react";
import PhotoUploader from "./photoUploder";
import Perks from "./Perks";
import axios from "axios";
import { Link, Navigate, useParams } from "react-router-dom";
export default function PlaceFormPage() {
  var [title, setTitle] = useState("");
  var [address, setAddress] = useState("");
  var [addedPhotos, setAddedPhotos] = useState([]);
  var [description, setDescription] = useState("");
  var [perks, setPerks] = useState([]);
  var [extraInfo, setExtraInfo] = useState("");
  var [checkOut, setCheckOut] = useState("");
  var [checkIn, setCheckIn] = useState("");
  var [maxGuests, setMaxGuests] = useState("");
  var [price, setprice] = useState("");
  var [redirect, setRedirect] = useState("");
  //  console.log("place",updateDate)\
  const { action } = useParams();
  var [uPlace,setUPlace] = useState({});
  useEffect(() => {
    if (action != "new" && action != undefined) {
      axios.get("/places/" + action).then((res) => {
        const { data } = res;
        // console.log(data)
        const updateDate = data;
        setUPlace(updateDate)

        setTitle(updateDate.title);

        setAddress(updateDate.address);
        addedPhotos = updateDate.images;
        setAddedPhotos(updateDate.images)
        // description = updateDate.des
        setDescription(updateDate.des);
        // perks = updateDate.perks
        setPerks(updateDate.perks)
        // extraInfo = updateDate.extraInfo(
        setExtraInfo(updateDate.extraInfo);
        // checkOut = updateDate.checkOut
        setCheckOut(updateDate.checkOut);
        // checkIn = updateDate.checkIn
        setCheckIn(updateDate.checkIn);
        // maxGuests = updateDate.maxGuests
        setMaxGuests(updateDate.maxGuests);
        setprice(updateDate.price)
      });
      // setUPlace()
    }
  }, []);

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  function h2andp(header, para) {
    // setPerks(["sdf"])
    return (
      <>
        <h2 className="mt-5 text-2xl">{header}</h2>
        <p className="text-gray-500 text-sm">{para}</p>
      </>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price
    };

    if (action != 'new' && action!=undefined) {
      //update
     
      // console.log(uPlace)
      const { data: responseData } = await axios.put("/places/" + action, {
        id: uPlace._id,
        ...placeData,
      });
      setRedirect("/");
    } else {
      //add new place
      const { data: responseData } = await axios.post("/places", {
        ...placeData,
      });
      setRedirect("/");
    }
  }
  return (
    <form className="" onSubmit={savePlace}>
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
      {h2andp("Photos", "more better ")}
      <PhotoUploader uploadedPhoto={addedPhotos} onChange={setAddedPhotos} />
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
      <div className="flex grid sm:grid-cols-2 md:grid-cols-4 gap-2">
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
        <div className="mt-2 -mb-1">
          <h3>Price per night</h3>
          <input
            type="number"
            placeholder="6000"
            value={price}
            onChange={(ev) => setprice(ev.target.value)}
          />
        </div>
      </div>

      <button className="bg-search rounded-full text-white mt-4 h-8 max-w-2xl ">
        Save
      </button>
    </form>
  );
}
