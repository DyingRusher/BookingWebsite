export default function BookingWidgt({place}){
    return (
        <div>
        <div className="shadow p-4 rounded-2xl bg-gray-300">
          <div className="text-2xl text-center">
            Price : ${place.price}/per night
          </div>
          <div className="flex">
            <div className="border text-center rounded-2xl m-2">
              <label>Check-in:</label>{" "}
              <input className="bg-gray-300 p-1 mt-2" type="date" />
              <br />
            </div>
            <div className="border text-center rounded-2xl m-2">
              <label>Check-out:</label>{" "}
              <input className="bg-gray-300 p-1 mt-2" type="date" />
              <br />
            </div>
          </div>
          <br />
          <div className=" rounded-2xl mb-4 p-2">
            <label>Number of Guest:</label>{" "}
            <input className="bg-gray-300 p-1" type="number" />
            <br />
          </div>
          <button className="loginBtn">Book hotel </button>
        </div>
      </div>
    )
}