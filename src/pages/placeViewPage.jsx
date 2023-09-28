import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PlaceViewPage() {
  const { id } = useParams();
  const [place, setPlace] = useState("");
  const [Allphotos,setAllPhotos] = useState(false);


   useEffect(() => {
    axios.get(`/places/${id}`).then((res) => {
      setPlace(res.data);
    });
  }, [id]);

  function showAllPhotos(){
    setAllPhotos(true);
  }
  if(Allphotos){
    return (<div className="">adf</div>)
  }

  return (
    <div className="m-8 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="text-2xl">{place.title}</h1>
      <a
        className="block my-2 font-semibold underline"
        target="_blank"
        href={"https://maps.google.com/?q=" + place.address}
      >
        {place.address}
      </a>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr]">
          <div>
            {place.images?.[0] && (
              <div>
                <img
                  className="aspect-square object-cover "
                  src={"http://localhost:6969/uploads/" + place.images[0]}
                />
              </div>
            )}
          </div>
          <div className="gap-2 grid">
            {place.images?.[1] && (
              <img
                className="aspect-square object-cover relative"
                src={"http://localhost:6969/uploads/" + place.images[1]}
              />
            )}
            <div className="overflow-hidden">
              {place.images?.[2] && (
                <img
                  className="aspect-square object-cover"
                  src={"http://localhost:6969/uploads/" + place.images[0]}
                />
              )}
            </div>
          </div>
        </div>
        <button onClick={showAllPhotos} className="flex gap-2 absolute bottom-3 right-3 rounded-2xl py-2 px-4 shadow shadow-md">
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
    </div>
  );
}
