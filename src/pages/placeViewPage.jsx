import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWidgt from "./bookinhWidgt";

export default function PlaceViewPage() {
  const { id } = useParams();
  const [place, setPlace] = useState("");
  const [Allphotos, setAllPhotos] = useState(false);

  useEffect(() => {
    axios.get(`/places/${id}`).then((res) => {
      setPlace(res.data);
    });
  }, [id]);

  function showAllPhotos() {
    setAllPhotos(true);
  }
  if (Allphotos) {
    return (
      <div className="absolute inset-0 bg-white min-h-screen">
        <div className="p-8 gap-5 grid">
          <div className="">
            <h1 className="text-3xl">Photos of {place.title}</h1>
            <button
              onClick={() => {
                setAllPhotos(false);
              }}
              className="flex right-12 top-8 fixed text-lg gap-2 shadow shadow-black rounded-2xl py-2 px-4 m-2"
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
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Close button
            </button>
          </div>
          {place?.images?.length > 0 &&
            place.images.map((photo) => (
              <div key={photo}>
                <img src={"http://localhost:6969/uploads/" + photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="m-8 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="text-2xl">{place.title}</h1>
      <a
        className="block my-2 flex gap-1 font-semibold underline"
        target="_blank"
        href={"https://maps.google.com/?q=" + place.address}
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
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>

        {place.address}
      </a>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
          <div>
            {place.images?.[0] && (
              <div>
                <img onClick={()=>{setAllPhotos(true)}}
                  className="cursor-pointer aspect-square object-cover "
                  src={"http://localhost:6969/uploads/" + place.images[0]}
                />
              </div>
            )}
          </div>
          <div className="gap-2 grid">
            {place.images?.[1] && (
              <img onClick={()=>{setAllPhotos(true)}}
                className="cursor-pointer aspect-square object-cover relative"
                src={"http://localhost:6969/uploads/" + place.images[1]}
              />
            )}
            <div className="overflow-hidden">
              {place.images?.[2] && (
                <img onClick={()=>{setAllPhotos(true)}}
                  className="cursor-pointer aspect-square object-cover"
                  src={"http://localhost:6969/uploads/" + place.images[0]}
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={showAllPhotos}
          className="flex gap-2 absolute bottom-3 right-3 rounded-2xl py-2 px-4 shadow shadow-md"
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
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          show all photos
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] py-8 gap-6">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.des}
          </div>
          Check-in:{place.checkIn}
          <br />
          Check-out:{place.checkOut}
          <br />
          Max number of Guest:{place.maxGuests}
        </div>
        <div>
          <BookingWidgt place={place} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 pt-6 pb-4">
        <h2 className="font-semibold text-2xl">Extra Info</h2>
        <div className="my-2 text-sm w-full text-gray-700 leading-4">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
}
