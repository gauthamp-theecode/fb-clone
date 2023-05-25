import React from 'react'
import './share.css';
import {useContext} from 'react'
import { UserContext } from '../../UserContext';

export default function Share({changeState}) {
  const { user } = useContext(UserContext);

  return (
    <div className='share' >

        <div className="shareWrapper">
            <div className="shareTop">
            <img className='shareProfileImage' src={user.avatar} alt="" />
            <div className="shareInputCont"></div>
            <input placeholder="What's on your mind?"  onClick={changeState} className='shareInput' />
            </div>
             </div>

    </div>
  )
}
