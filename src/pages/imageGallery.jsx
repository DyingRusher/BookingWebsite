import { useState } from "react";

export default function ImageGallery({place}){

    const [Allphotos, setAllPhotos] = useState(false);

    function showAllPhotos() {
        setAllPhotos(true);
      }

      if (Allphotos) {
        return (
          <div className="absolute inset-0 bg-white min-h-screen w-full">
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
    )
}