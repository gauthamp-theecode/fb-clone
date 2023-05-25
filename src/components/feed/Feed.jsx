import Post from "../post/Post";
import "./feed.css";
import { useState,useEffect } from 'react';
import Share from "../share/Share"

export default function Feed({changeState}) {
  const[posts,setPosts] = useState([]);
  const[users,setUsers] = useState([]);

  
useEffect(() => {
  const url = new URL('https://646dabff9c677e23218a37ce.mockapi.io/posts');
  url.searchParams.append('isApproved', true);
  fetch(url, {
  method: 'GET',
  headers: {'content-type':'application/json'},
  }).then(res => {
  if (res.ok) {
      return res.json();
  }
  // handle error
  }).then(post => {
  setPosts(post);
  }).catch(error => {
  // handle error
  });

  fetch('https://646dabff9c677e23218a37ce.mockapi.io/users', {
    method: 'GET',
    headers: {'content-type':'application/json'},
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
    }).then(users=>{
      setUsers(users);
    }).catch(error => {

    });
}, []);
  return (
    <div className="feed">
      <div className="feedWrapper">
      <Share  changeState={changeState}/>
      {posts.map((p)=>(
               <Post key={p.id} post={p} Users={users}/>
      ))}
      </div>
    </div>
  );
}
