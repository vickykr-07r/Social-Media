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
          <div className={Style.profilePic}>
          <img src={user.profilePic} alt="" />
          </div>
          <div className={Style.name}>
           <h2>{user.name}</h2>
        <h3>{user.username}</h3>
          </div>
         <div className={Style.button}>
          <button>Follow</button>
         </div>
      </div>
    );
  })
}

        </>
    )
}

export default otherfollowers