import { createContext } from "react"
export let ServerurlContext=createContext(null)
function Serverurl({children}){
    let serverurl="http://localhost:8080";
    let value={
      serverurl
    }
return(
    <ServerurlContext.Provider value={value}>
     {children}
    </ServerurlContext.Provider>
)
}
export default Serverurl;