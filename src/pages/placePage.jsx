import { Link, Navigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";

import PlaceFormPage from "./placeFormPage";

export default function PlacePage() {
  var { action } = useParams();
  const [placeData,setPlaceData] = useState('');
  var [places, setPlaces] = useState('');
  
  // console.log("action",action)
  
  useEffect( () => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
     
    });
  }, []);

  

  return (
    <div>
      {action == undefined && (
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
          <div className="text-center">
            {places.length > 0 &&
              places.map((place) => (
                <Link to={'/account/places/' + place._id}
                  key={place._id}
                  className="cursor-pointer grow shrink-0 flex border m-4 rounded-2xl bg-gray-200"
                >
                  <div className="flex  w-32 h-32 bg-gray-300 m-3">
                    {place.images.length > 0 && (<img className="object-cover"src={'http://localhost:6969/uploads/' + place.images[0]} />)}
                  </div>
                  <div>
                  <h2 className="m-1 text-xl">{place.title}</h2>
                  <p className="text-left m-1 text-sm ">{place.des}</p>
                  </div>
                  
                </Link>
              ))}
          </div>
        </div>
      )}
      {action !== "new" && action != undefined && <PlaceFormPage />}
      {action === "new" && <PlaceFormPage updateDate={' '}/>}
    </div>
  );
}
