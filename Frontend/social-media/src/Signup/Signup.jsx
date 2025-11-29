import { useState, useContext } from "react";
import Style from "../Signup/Signup.module.css";
import axios from "axios";
import { ServerurlContext } from "../Context/Serverurl.jsx";
import { useDispatch } from "react-redux";
import { setUserData } from "../Redux/userslice.js";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  });
  
  let navigate = useNavigate()
  const dispatch=useDispatch()

  const { serverurl } = useContext(ServerurlContext);

  function handelInput(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const result = await axios.post( `${serverurl}/api/auth/signup`,formData,{ withCredentials: true });
      console.log(result.data);
      dispatch(setUserData(result.data))
      navigate("/")
      setFormData({
        name: "",
        username: "",
        email: "",
        password: ""
      });

    } catch (error) {
      console.log(`error on frontend signup ${error}`);
    }
  }

  return (
    <>
      <div className={Style.Container}>
        <div className={Style.box}>
          <div className={Style.form}>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Enter your name"
                value={formData.name} onChange={handelInput} name="name" />

              <input type="text" placeholder="Enter your username"
                value={formData.username} onChange={handelInput} name="username" />

              <input type="email" placeholder="Enter your email"
                value={formData.email} onChange={handelInput} name="email" />

              <input type="password" placeholder="Enter your password"
                value={formData.password} onChange={handelInput} name="password" />

              <button>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
