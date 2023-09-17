import { Link, useParams } from "react-router-dom";
import Perks from "./Perks";
import { useState } from "react";
import axios from "axios";

export default function PlacePage() {
  const { action } = useParams();
  const [title,setTitle] = useState('')
  const [address,setAddress] = useState('')
  const [addedPhotos,setAddedPhotos] = useState([])
  const [photoLink,setPhotoLink] = useState('')
  const [description,setDescription] = useState('')
  const [perks,setPerks] = useState('')
  const [extraInfo,setExtraInfo] = useState('')
  const [checkOut,setCheckOut] = useState('')
  const [checkIn,setCheckIn] = useState('')
  const [maxGuests,setMaxGuests] = useState('')
  const [readyAddPhoto,setReadyAddPhoto] = useState(false)
  // console.log(action)
  function h2andp(header,para){

    return (
      <>
      <h2 className="mt-5 text-2xl">{header}</h2>
          <p className="text-gray-500 text-sm">{para}</p>
      </>
    )
  }

 async function AddPhotos(ev){
  setReadyAddPhoto(true)
  ev.preventDefault()
  const {data:filename} = await axios.post('/addimage-account',{link:photoLink})
  setPhotoLink('')
  await setAddedPhotos((pre)=>{
    return [...pre,filename]
  })
  // console.log(addedPhotos)
  setReadyAddPhoto(false)
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
        <form className="">
          {h2andp('Title','This is for your place,should be short and catchy')}
          <input type="text" name="" placeholder="title , example : Charusat" value={title} onChange={ev => setTitle(ev.target.value)} />
          {h2andp('Address','Address of that place')}
         
          <input type="text" name="" placeholder="Address" value={address} onChange={ev => setAddress(ev.target.value) }/>
          {h2andp('Photos','more = better')}
          <div className="flex gap-2">
            <input
              className=""
              type="text"
              placeholder="paste link here.............."
              value={photoLink}
              onChange={ev => setPhotoLink(ev.target.value)}
            />
            <button className="bg-gray-300 px-4 rounded-full max-w-fit" onClick={AddPhotos}>
              Add&nbsp; photo
            </button>
          </div>
          <div className="flex gap-5">
          {
            readyAddPhoto && (
              <img className="rounded-3xl"src="https://media.tenor.com/6AJbOBwmcVsAAAAC/reloading-valorant.gif" alt="" />
            )
          }
         
          {addedPhotos.length > 0 && (
              addedPhotos.map( link => (
                <div >
                  <img className="rounded-xl max-w-fit max-h-fit mt-3 "src={'http://localhost:6969/uploads/' + link} alt="sd" />
                </div>
                
              ) 
          ))}
          <div className="mt-3 block grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
            <button className="flex justify-center bg-transparent border rounded-2xl p-8 max-w-fit text-2xl gap-2">
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
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              Upload
            </button>
          </div>
          </div>
          {h2andp('Description','Description of place')}
          <textarea className="border rounded-xl w-full py-6" value={description} onChange={ev => setDescription(ev.target.value)}/>
          {h2andp('Perks','Select all perks of your place')}  
          <Perks selected={perks} onChange={setPerks}/>
          {h2andp('Extra Info','House rules,etc.')}
          <textarea className="w-full p-6 border rounded-xl" value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
          <h2 className="text-xl mt-4">Check in and Check out</h2>
          <p className="text-sm text-gray-500">
            Remember to have time window for room cleaning
          </p>
          <div className="flex grid sm:grid-cols-3 gap-2">
            <div className="mt-2 -mb-1">
              <h3>Check in time</h3>
              <input type="text" placeholder="14:00" value={checkOut} onChange={ev => setCheckOut(ev.target.value)}/>
            </div>
            <div className="mt-2 -mb-1">
              <h3>Check out time</h3>
              <input type="text" placeholder="21:00" value={checkIn} onChange={ev => setCheckIn(ev.target.value)}/>
            </div>
            <div className="mt-2 -mb-1">
              <h3>Max. guests</h3>
              <input type="number" placeholder="5" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} />
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
