import "./topbar.css";
import { useContext } from "react";
import {Link} from 'react-router-dom'
import { UserContext } from '../../UserContext';
import HomeIcon from '@mui/icons-material/Home';
import HowToRegIcon from '@mui/icons-material/HowToReg';

export default function Topbar() {
  const { user,logoutUser } = useContext(UserContext);
  const logout =() =>{
    logoutUser();
  }
  return (
    <>
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link  to="/" style={{textDecoration:'none'}}>
        <img height='60px' src={"assets/icon.png"} alt="" />
        </Link>
      </div>
      <div className="topbarCenter">
      <div className="topbarLinks">
        <div className="topbarCenterIcon">
          <div  className="">
            <Link to="/">
          <HomeIcon style={{fontSize:'30px',color:"grey",position:'relative',  opacity:'0.7'}}/>
          </Link>
          </div>
          </div>
          {
            user.isAdmin == true ? 
                <div className="topbarCenterIcon">
                  <Link to="/admin">
                  <HowToRegIcon style={{fontSize:'30px',color:"grey"}}/>
                  </Link>
                </div> : ""
            }
        
        </div>
      </div>
      <div className="topbarRight">
        <img src={user.avatar} alt="" className="topbarImg"/>
        <button onClick={logout} id="logout">LOGOUT</button>
      </div>
    </div>
    </>
  );
}
