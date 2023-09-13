import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { userContext } from "../UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validU, setValidU] = useState(false);
  const { setUser } = useContext(userContext);

  async function LoginUser(ev) {
    ev.preventDefault();
    try {
      const user1 = await axios.post(
        "/login",
        { email, password },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          withCredentials: true,
        }
      );

      if (!!user1) {
        setValidU(true);
      }
      console.log(user1);
      setUser(user1.data );
    } catch (er) {
      console.log(`Error during login user${er}`);
    }
  }

  if (validU) {
    // console.log("Sdf");
    return <Navigate to={"/"} />;
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
