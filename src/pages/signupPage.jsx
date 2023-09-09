import { useState } from "react";
import { Link } from "react-router-dom";
import axios, { Axios } from 'axios'

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function registerUser(ev){
    ev.preventDefault()
    axios.post('/register',{
      name,email,password
    })
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <p className="text-3xl text-center py-3">Register</p>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Tony Stark"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
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
            onChange={(ev) => {
              console.log("s");
              setPassword(ev.target.value);
              console.log(password);
            }}
          />
          <button className="loginBtn">Sign up</button>
          <div className="text-center py-2 text-gray-600">
            Already have account?{" "}
            <Link className="underline text-black " to={"/login"}>
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
