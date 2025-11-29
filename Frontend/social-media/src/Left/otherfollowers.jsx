import { useSelector } from "react-redux"
import Style from "../Left/otherfollowers.module.css"
function otherfollowers(){
    let {otherUserData}=useSelector((state)=>state.user)
    return(
        <>
        {otherUserData &&
         otherUserData.slice(0,3).map((user) => {
         return (
        
    <div key={user._id} className={Style.container}>
        <img src={user.profilePic} alt="" />
        <h2>{user.name}</h2>
        <h3>{user.username}</h3>
        <button>Follow</button>
      </div>
    );
  })
}

        </>
    )
}

export default otherfollowers