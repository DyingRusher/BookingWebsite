import { useState } from "react";
import axios from "axios";


export default function PhotoUploader({uploadedPhoto, onChange} ) {
  const [photoLink, setPhotoLink] = useState("");
  const [readyAddPhoto, setReadyAddPhoto] = useState(false);

  async function AddPhotos(ev) {
    setReadyAddPhoto(true);
    ev.preventDefault();
    const { data: filename } = await axios.post("/addimage-account", {
      link: photoLink,
    });
    setPhotoLink("");
    onChange((pre) => {
      return [...pre, filename];
    });
    // console.log(addedPhotos)
    setReadyAddPhoto(false);
  }

  async function uploadPhoto(ev) {
    const files1 = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files1.length; i++) {
        //  data.append("photos", files1[i]);
    
    data.set('photos',files1[0])
    // console.log(data)
    const response = await axios.post("/upload", data, {
        headers: {
          "Content-Type": "multiport/form-data",
        },
      });
    //   console.log(data);
      const { data: filename1 } = response;
    //   console.log(response)
      await onChange((pre) => {
        return [...pre, filename1];
      })
    }
      
  }

  return (
    <>
      <div className="flex gap-2">
        <input
          className=""
          type="text"
          placeholder="paste link here.............."
          value={photoLink}
          onChange={(ev) => setPhotoLink(ev.target.value)}
        />
        <button
          className="bg-gray-300 px-4 rounded-full max-w-fit"
          onClick={AddPhotos}
        >
          Add&nbsp; photo
        </button>
      </div>
      <div className="flex gap-5">
        {readyAddPhoto && (
          <img
            className="rounded-3xl"
            src="https://media.tenor.com/6AJbOBwmcVsAAAAC/reloading-valorant.gif"
            alt=""
          />
        )}

        {uploadedPhoto.length > 0 &&
          uploadedPhoto.map((link) => (
            <div className="flex h-32" key={link}>
              <img
                
                className="h-32 rounded-xl w-full object-cover"
                src={"http://localhost:6969/uploads/" + link}
                alt="sd"
              />
            </div>
          ))}
        <div className="mt-3 block grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
          <label className="cursor-pointer flex justify-center bg-transparent border rounded-2xl p-8 max-w-fit text-2xl gap-2">
            <input type="file" className="hidden " onChange={uploadPhoto} multiple/>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            Upload
          </label>
        </div>
      </div>
    </>
  );
}
