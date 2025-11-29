import Left from "../Left/Left.jsx";
import Feed from "../Feed/Feed.jsx";
import Style from "../Home/Home.module.css"
function Home(){
return(
    <>
    <div className={Style.container}>
        <div className={Style.left}>
         <Left/>
        </div>
        
        <div className={Style.middle}>
           <Feed/>
        </div>
        <div className={Style.right}>

        </div>
    </div>
   
    
    </>
)
}
export default Home;