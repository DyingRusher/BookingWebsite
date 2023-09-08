import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <p className="text-3xl text-center">Login</p>
        <form className="max-w-md mx-auto">
          <input type="email" placeholder="example@abc.com" />
          <input type="password" placeholder="password" />
          <button className="loginBtn">Login</button>
        <div className="text-center py-2 text-gray-600">
            Don't have account yet? <Link className="underline text-black"to={'/signup'}>Sign Up</Link>
        </div>
        </form>
      </div>
    </div>
  );
}