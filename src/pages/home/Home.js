import "./home.css"
import Feed from "../../components/feed/Feed";
import Topbar from "../../components/topbar/Topbar";



export default function Home({showCreatePost,changeState}) {
 
  return (
     <>
      <div className={showCreatePost?"halfVisualHome":"fullVisualHome"}>

         <Topbar/>   
        
         <div className="homeContainer">
         
         <Feed changeState={changeState}/>
         
         </div>

         </div>
    </>
  )
}
