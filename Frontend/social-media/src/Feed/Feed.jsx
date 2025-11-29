import Style from "../Feed/Feed.module.css"
import Story from "../Story/Story";
function Feed(){
    return(
    <>
    <div className={Style.container}>
        <div className={Style.storyRow}>
         <Story name="vicky"/> 
         <Story name="vicky"/> 
         <Story name="vicky"/> 
         <Story name="vicky"/> 
         <Story name="vicky"/> 
         <Story name="vicky"/> 
         <Story name="vicky"/> 
         <Story name="vicky"/>
        </div>
    </div>
    </>)
}
export default Feed;