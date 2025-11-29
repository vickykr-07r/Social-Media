import Style from "../Story/Story.module.css";

function Story({ profileimage, name }) {
  return (
    <div className={Style.container}>
      <div className={Style.box}>
        <img src={profileimage} alt="" />
      </div>
      <h2>{name}</h2> 
    </div>
  );
}

export default Story;
