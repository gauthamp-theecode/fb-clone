import "./home.css"
import AdminFeed from "../../components/adminFeed/adminFeed";
import Topbar from "../../components/topbar/Topbar";
import {useContext} from 'react'
import { Navigate } from 'react-router-dom';

import { UserContext } from '../../UserContext';


export default function Home({showCreatePost,changeState}) {
  const { user } = useContext(UserContext);

  if(!user) {
    return (<Navigate to="/login"/>)
  }

  return (
     <>
      <div className={showCreatePost?"halfVisualHome":"fullVisualHome"}>

         <Topbar/>   
        
         <div className="homeContainer">
         
         <AdminFeed changeState={changeState}/>
        
         </div>

         </div>
    </>
  )
}
