import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { differenceInCalendarDays, format } from "date-fns";
import axios from "axios";
export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState("");
  const [Allphotos, setAllPhotos] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.filter(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
        // console.log(booking)
      });
    }
  }, [id]);

  function showAllPhotos() {
    setAllPhotos(true);
  }
  if (Allphotos) {
    return (
      <div className="absolute inset-0 bg-white min-h-screen">
        <div className="p-8 gap-5 grid">
          <div className="">
            <h1 className="text-3xl">Photos of {booking[0].place.title}</h1>
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
          {booking[0].place?.images?.length > 0 &&
            booking[0].place.images.map((photo) => (
              <div key={photo}>
                <img src={"http://localhost:6969/uploads/" + photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  // console.log(booking)

  if (!booking) {
    return "";
  }

  return (
    <div className="my-8">
      <div>
        <h2 className="text-xl font-semibold">{booking[0].place.title}</h2>
        <a
          className="block my-2 flex gap-1 font-semibold underline"
          target="_blank"
          href={"https://maps.google.com/?q=" + booking[0].place.address}
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

          {booking[0].place.address}
        </a>

        <div className="bg-gray-300 items-center justify-between flex rounded-2xl p-4 my-7">
          <div>
            <h1 className="text-2xl font-semibold w-fit">
              Your booking Information
            </h1>

            <div className=" pt-2 text-l pb-1 text-gray-700 flex gap-1">
              <div className="pr-4 gap-1 flex">
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
                    d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                  />
                </svg>
                {differenceInCalendarDays(
                  new Date(booking[0].checkOut),
                  new Date(booking[0].checkIn)
                )}{" "}
                {differenceInCalendarDays(
                  new Date(booking[0].checkOut),
                  new Date(booking[0].checkIn)
                ) == 1 && <span>Night:</span>}
                {differenceInCalendarDays(
                  new Date(booking[0].checkOut),
                  new Date(booking[0].checkIn)
                ) != 1 && <span>Nights:</span>}
              </div>
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
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>
              {format(new Date(booking[0].checkIn), "yyyy-mm-dd")} {" -> "}{" "}
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
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>
              {format(new Date(booking[0].checkOut), "yyyy-mm-dd")}
            </div>
          </div>
          <div className="gray-500 text-l bg-search p-3 rounded-2xl text-white">
            <div className="text-gray-300">Total Price </div>
            <div className="text-3xl text-gray-300">${differenceInCalendarDays(
                  new Date(booking[0].checkOut),
                  new Date(booking[0].checkIn)
                ) * booking[0].place.price} </div>
          </div>
        </div>

        <div className="relative">
          <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
            <div>
              {booking[0].place.images?.[0] && (
                <div>
                  <img
                    onClick={() => {
                      setAllPhotos(true);
                    }}
                    className="cursor-pointer aspect-square object-cover "
                    src={
                      "http://localhost:6969/uploads/" +
                      booking[0].place.images[0]
                    }
                  />
                </div>
              )}
            </div>
            <div className="gap-2 grid">
              {booking[0].place.images?.[1] && (
                <img
                  onClick={() => {
                    setAllPhotos(true);
                  }}
                  className="cursor-pointer aspect-square object-cover relative"
                  src={
                    "http://localhost:6969/uploads/" +
                    booking[0].place.images[1]
                  }
                />
              )}
              <div className="overflow-hidden">
                {booking[0].place.images?.[2] && (
                  <img
                    onClick={() => {
                      setAllPhotos(true);
                    }}
                    className="cursor-pointer aspect-square object-cover"
                    src={
                      "http://localhost:6969/uploads/" +
                      booking[0].place.images[2]
                    }
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
      </div>
    </div>
  );
}
