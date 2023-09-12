import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function LoginUser(ev) {
    ev.preventDefault();
    try {
      await axios.post(
        "/login",
        { email, password },
        {
          withCredentials:true
        }
      ).then(()=>{console.log("nice")}).catch((er)=>{console.log(er)});
    } catch (er) {
      console.log(`Error during login user${er}`);
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <p className="text-3xl text-center">Login</p>
        <form className="max-w-md mx-auto" onSubmit={LoginUser}>
          <input
            type="email"
            placeholder="example@abc.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="loginBtn">Login</button>
          <div className="text-center py-2 text-gray-600">
            Don't have account yet?{" "}
            <Link className="underline text-black" to={"/signup"}>
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
