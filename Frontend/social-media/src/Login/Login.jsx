import { useState, useContext } from "react";
import Style from "../Login/Login.module.css";
import axios from "axios";
import { ServerurlContext } from "../Context/Serverurl.jsx";
import ResetPassword from "../ResetPassword/ResetPassword.jsx";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const [LoginData, setLoginData] = useState({
    username: "",
    password: ""
  });
  let navigate =useNavigate()
  const { serverurl } = useContext(ServerurlContext);

  function handleInput(event) {
    setLoginData({ ...LoginData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const result = await axios.post(
        `${serverurl}/api/auth/login`,
        LoginData,
        { withCredentials: true }
      );

      console.log(result.data);
      alert("Login successful!");
      navigate("/")
      setLoginData({
        username: "",
        password: ""
      });

    } catch (error) {
      console.log(`error on frontend login ${error}`);
      alert(error.response?.data?.message || "Login failed!");
    }
  }

  return (
    <div className={Style.Container}>
      <div className={Style.box}>
        <div className={Style.form}>
          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Enter your username"
              value={LoginData.username}
              onChange={handleInput}
              name="username"
            />

            <input
              type="password"
              placeholder="Enter your password"
              value={LoginData.password}
              onChange={handleInput}
              name="password"
            />

            <button type="submit">Submit</button>

          </form>
        </div>
        <span><Link to="/resetpassword" >Reset Password</Link></span>
      </div>
    </div>
  );
}

export default Login;
