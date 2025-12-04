import Signup from "./Signup/Signup.jsx"
import Login from "./Login/Login.jsx"
import ResetPassword from "./ResetPassword/ResetPassword.jsx"
import { Routes, Route, Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Home from "./Home/Home.jsx"
import { setUserData } from "./Redux/userslice.js"
import { useEffect } from "react"
import { Getcurrentuser } from "./Hooks/Getcurrentuser.jsx"
import Getsuggesteduser from "./Hooks/Getsuggesteduser.jsx"
import Profile from "./Profile/Profile.jsx"
import EditProfile from "./EditProfile/EditProfile.jsx"
function App() {
  Getcurrentuser()
  let {userData}=useSelector((state)=>state.user)
  Getsuggesteduser()
  return (
    <>
  <Routes>
  <Route path="/" element={userData ? <Home /> : <Navigate to="/signup"/>} />
  <Route path="/login" element={!userData ? <Login /> :<Navigate to="/"/> } />
  <Route path="/signup" element={!userData ? <Signup /> : <Navigate to="/"/>} />
  <Route path="/resetpassword" element={<ResetPassword />} />
  <Route path="/profile/:username" element={<Profile />} />
  <Route path="/editprofile" element={<EditProfile/>} />
  </Routes>

    </>
  )
}

export default App
