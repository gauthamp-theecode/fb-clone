import Post from "../post/Post";
import "./feed.css";
import { useState,useEffect } from 'react';


export default function AdminFeed({changeState}) {
  const[posts,setPosts] = useState([]);
  const[users,setUsers] = useState([]);
  const[IsChanged,setIsChanged] = useState([false]);
  
useEffect(() => {
  const url = new URL('https://646dabff9c677e23218a37ce.mockapi.io/posts');
  url.searchParams.append('isApproved', false);
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

  
}, [IsChanged]);

useEffect(() => {
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
},[])

const Approve =(e) =>{
  fetch('https://646dabff9c677e23218a37ce.mockapi.io/posts/' + e.target.id, {
  method: 'PUT', // or PATCH
  headers: {'content-type':'application/json'},
  body: JSON.stringify({isApproved: true})
  }).then(res => {
    if (res.ok) {
        return res.json();
    }
    // handle error
  }).then(task => {
    setIsChanged(!IsChanged);
  }).catch(error => {
    // handle error
  })
};

const Decline = (e) =>{
  fetch('https://646dabff9c677e23218a37ce.mockapi.io/posts/' + e.target.id, {
    method: 'DELETE',
  }).then(res => {
    if (res.ok) {
        return res.json();
    }
    // handle error
  }).then(task => {
    setIsChanged(!IsChanged);
  }).catch(error => {
    // handle error
  })
};
  return (
    <div className="feed">
      <div className="feedWrapper">
      {posts.map((p)=>(
              <div>
               <Post key={p.id} post={p} Users={users}/>
               <div class="buttonWrapper">
                <button onClick={Approve} id={p.id} class="Approve"> Approve </button>
                <button onClick={Decline} id={p.id} class="Decline"> Decline</button>
               </div>
               </div>
      ))}
      </div>
    </div>
  );
}
