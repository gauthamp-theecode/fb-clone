import React, { useState } from 'react'
import './register.css'
import { Link,Navigate } from 'react-router-dom'

export default function Register() {
  const [name,setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword,setRePassword] = useState('');
  const [isAdmin,setIsAdmin] = useState('');
  const [error, setError] = useState('');
  const [isRegister,setIsRegister] = useState(false);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRePasswordChange = (e) =>{
    setRePassword(e.target.value);
  };

  const handleNameChange = (e) => {
     setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleIsAdminChange = (e) => {
    setIsAdmin(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    if (email.trim() === '' || password.trim() === '') {
      setError('Please enter both email and password.');
      return;
    }

    if(password != repassword){
        setError('Password does not match');
        return;
    }
    
    // Make a POST request to the mock API
    const url = new URL('https://646dabff9c677e23218a37ce.mockapi.io/users');
     url.searchParams.append('email', email);

    fetch(url, {
        method: 'GET',
        headers: {'content-type':'application/json'},
      }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // handle error
      }).then(user => {
        if(user.length == 0){
          setError("");
          const newUser = {
            name: name,
            email: email,
            password: password,
            isAdmin: isAdmin,
          };
    
        const url2 = new URL('https://646dabff9c677e23218a37ce.mockapi.io/users');
        
         fetch(url2, {
            method: 'POST',
            headers: {'content-type':'application/json'},
            // Send your data in the request body as JSON
            body: JSON.stringify(newUser)
          }).then(res => {
            if (res.ok) {
                return res.json();
            }
            // handle error
          }).then(task => {
                setIsRegister(true);
          }).catch(error => {
            // handle error
          })
    
          return;
        }
          setError("Email ID Already Exists");
      }).catch(error => {
        // handle error
    })

  };

  if(isRegister == true){
    return (<Navigate to="/login"/>);
}

  return (
    <div className="register">
        <div className="registerWrapper">
            <div className="registerLeft">
                <h3 className="registerLogo">facebook</h3>
                <div className="registerLeftDesc">
                 Connect with friends and the world <br /> around you on Facebook.
                </div>
            </div>
            <div className="registerRight">
            <div className="registerBox">
            <form action="" className='registerForm'>
                    <div class="registerUsername">
                        <input className='registerInput' placeholder='Username' type="text" id="username-l" value={name} onChange={handleNameChange}/>
                    </div>
                    <div class="registerEmail">
                        <input className='registerInput' placeholder='Email' type="email" id="email" value={email} onChange={handleEmailChange}/>
                    </div>
                    <div class="registerPassword">
                        <input className='registerInput' placeholder='Password' type="password" id="password-R" value={password} onChange={handlePasswordChange}/>
                    </div>
                    <div class="registerPassword">
                        <input className='registerInput' placeholder='Retype-password' type="password" id="re-Password-R" value={repassword} onChange={handleRePasswordChange}/>
                    </div>
                    <div style={{display: 'flex'}}>
                        <p>Are you an Admin? </p>
                        <input style= {{width: 'auto' , height: 'auto' ,marginLeft: '30px'}} className='registerInput' placeholder='Admin' type="checkbox" value={isAdmin} onChange={handleIsAdminChange}/>
                    </div>
                    <div class="registerSubmit">
                    {error && <p>{error}</p>}
                        <button id="loginBtn" type="submit" onClick={handleSubmit}>REGISTER</button>
                    </div>
                    <hr className="registerHr" />
                    <div class="registerLoginAc">
                    
                        <label for="reg-btn">
                                <Link  style={{textDecoration:'none'}} to="/login">
                        <span >Already have a account?</span>
                        </Link>
                        </label>       
                        </div>
                </form>
            </div>
            <div className="registerRightDesc">
              <b>Create a Page </b> for a celebrity, brand or business.
            </div>
        </div>
        </div>
    </div>
  )
}
