
import CloseIcon from "@mui/icons-material/Close";
import './hiddenCreatePost.css';
import React,{useState,useRef,useContext} from 'react'
import { Navigate } from 'react-router-dom';

import Home from "../home/Home";
import { UserContext } from '../../UserContext';

export default function CreatePost() {
  const ref = useRef(null);
  const { user,logoutUser } = useContext(UserContext);
  const [showCreatePost,setShowCreatePost] = useState(false);
  const [desc,setDesc] = useState("");

  const handleDescChange = (e) =>{
      setDesc(e.target.value);
  }
  const changeState = () => {
    ref.current?.focus();
    setShowCreatePost(!showCreatePost);
  }

  const handleSubmit = () =>{
    const newPost = {
      userId: user.id,
      desc: desc,
      date: "May",
      isApproved: false,
    };
    
    fetch('https://646dabff9c677e23218a37ce.mockapi.io/posts', {
      method: 'POST',
      headers: {'content-type':'application/json'},
      // Send your data in the request body as JSON
      body: JSON.stringify(newPost)
    }).then(res => {
      if (res.ok) {
          return res.json();
      }
      // handle error
    }).then(post => {
      console.log(post);
      setShowCreatePost(false);
    }).catch(error => {
      // handle error
    })
  }

  if(!user) {
    return (<Navigate to="/login"/>)
  }
  return (<>

<Home showCreatePost={showCreatePost} changeState={changeState}/>

    <div className={showCreatePost ? "showCreatePost" : "hideCreatePost"}>
    <div className="createPostWrapper">
      <div className="createPostTop">
        <h3 className="createPostTitle">Create post</h3>
        <div className="createPostCloseIconCont">
          <CloseIcon
            style={{ fontSize: "26px", opacity: "0.8", cursor: "pointer" }}
            onClick={changeState}
          />
        </div>
      </div>
      <hr className="createPostHr" />
      <div className="createPostCenter">
        <div className="createPostProfileCont">
          <img
            className="createPostProfileImage"
            src={user.avatar}
            alt=""
          />
          <span className="createPostUsername">
            <b>{user.name}</b>
          </span>
        </div>
        <div className="createPostInputCont">
          <input
            type="text"
            placeholder="What's on your mind?"
            className="createPostInput"
            value={desc}
            onChange={handleDescChange}
          />
        </div>
      </div>
      <div className="createPostButtonCont">
      <button type="button" className="createPostButton" onClick={handleSubmit}><b>Post</b></button>
      </div>
    </div>
  </div>
  </>
  )
}
