import { Link, useParams } from "react-router-dom";

export default function PlacePage() {
  const { action } = useParams();
  // console.log(action)
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
      {action==='new' && (
        <form className="">
            <h2 className="text-2xl mt-5">Title</h2>
            <p className="text-sm text-gray-500">This is for your place,should be short and catchy</p>
            <input type="text" name="" placeholder="title , example : Charusat" />
            <h2 className="text-2xl mt-5">Address</h2>
            <p className="text-sm text-gray-500">Address of that place</p>
            <input type="text" name="" placeholder="Address" />
            <h2 className="text-2xl mt-5">Photos</h2>
            <p className="text-sm text-gray-500">more = better</p>
            <div className="mt-3 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
            <button className="bg-transparent border rounded-2xl p-8 max-w-fit text-2xl">+</button>
            </div>
        </form>
      )}
    </div>
  );
}
