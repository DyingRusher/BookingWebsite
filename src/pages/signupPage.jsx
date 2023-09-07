import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <p className="text-3xl text-center py-3">Register</p>
        <form className="max-w-md mx-auto">
          <input type="text" placeholder="Tony Stark" />
          <input type="email" placeholder="example@abc.com" />
          <input type="password" placeholder="password" />
          <button className="loginBtn">Login</button>
        <div className="text-center py-2 text-gray-600">
            Already have account? <Link className="underline text-black "to={'/login'}>Sign in</Link>
        </div>
        </form>
      </div>
    </div>
  );
}
