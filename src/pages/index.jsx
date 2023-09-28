import { Link } from "react-router-dom";
import Header from "../Header";
import { useEffect, useState } from "react";
import axios from "axios";

const Index_page = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("all-places").then((res) => {
      setPlaces(res.data);
    });
  }, []);
  return (
    <>
      <div className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {places.length > 0 &&
          places.map((place) => (
            <div key={place._id} className="  rounded-xl">
              {place.images?.[0] && (
                <img
                  className="rounded-2xl bg-gray-400 object-cover aspect-square"
                  src={"http://localhost:6969/uploads/" + place.images[0]}
                  alt=""
                />
              )}
              <div>
                <h2 className="text-sm truncate">{place.title}</h2>
                <h3 className="text-sm text-gray-800">{place.address}</h3>
                <div className="text-gray-700 mt-1"><span className="font-bold">${place.price}</span> per night</div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Index_page;
