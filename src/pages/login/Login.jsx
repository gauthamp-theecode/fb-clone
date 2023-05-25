import React,{ useState,useContext } from "react";
import { UserContext } from '../../UserContext';

import "./login.css";
import { Navigate,Link } from "react-router-dom";


export default function Login() {
  const { user,loginUser } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    if (email.trim() === '' || password.trim() === '') {
      setError('Please enter both email and password.');
      return;
    }
    
    // Make a POST request to the mock API
    const url = new URL('https://646dabff9c677e23218a37ce.mockapi.io/users');
     url.searchParams.append('email', email);
     url.searchParams.append('password', password);

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
          setError("Incorrect Username or Password");
          return;
        }
          setError("");
          loginUser(user[0]);
      }).catch(error => {
        // handle error
    })
  };

  if(user){
    if(user.isAdmin){
      return (<Navigate to="/admin"/>);
    }
    return (<Navigate to="/"/>);
  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">facebook</h3>
          <div className="loginLeftDesc">
            Connect with friends and the world <br /> around you on Facebook.
          </div>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <form action="#" className="loginForm" >
              <div class="loginUsername">
                <input
                  className="loginInput"
                  placeholder="Email"
                  type="email"
                  id="username-l"
                  value={email} 
                  onChange={handleEmailChange}
                />
                <div>
        </div>
              </div>
              <div class="loginPassword">
                <input
                  className="loginInput"
                  placeholder="Password"
                  type="password"
                  id="password-l"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div class="loginSubmit">
                  {error && <p>{error}</p>}
                  <button id="loginBtn" type="submit" onClick={handleSubmit}>Login</button>
              </div>
            </form>
          </div>
          <div className="loginRightDesc">
            Login using your credentials.
          </div>
          <hr className="loginHr" />
              <div class="loginCreateAc">
                <Link to="/register">
                  <input
                    className="loginCreateBtn"
                    type="submit"
                    value="Create new account"
                  />
                </Link>
              </div>
        </div>
      </div>
    </div>
  );
}

