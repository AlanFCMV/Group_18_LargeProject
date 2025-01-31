import React, { useState } from 'react';
import './Login.css';
import useTogglePassword from "../hooks/useTogglePassword";
import { json } from 'body-parser';
const jwt = require('jsonwebtoken');

function Login() {

  const appName = 'athena18'
  function buildPath(route){
    if(process.env.NODE_ENV ==='production'){
      return 'https://' + appName + '.herokuapp.com/' + route;
    }
    else{
      return 'http://localhost:5000/' + route;
    }
  }
  
  var loginName;
  var loginPassword;

   const [message, setMessage] = useState('');

  const doLogin = async event => {
    event.preventDefault();

    var obj = {Login:loginName.value, Password:loginPassword.value};
    var js = JSON.stringify(obj);

    if(loginName.value && loginPassword.value)
    {
      try{
        const response = await fetch(buildPath('api/login'), {method:'POST', body:js,headers:{'Content-Type': 'application/json'}});
        //console.log(response);
        var res = JSON.parse(await response.text());
        console.log("inside")
        if(res.error)
        {
          console.log("error")
          document.getElementById('addError').innerHTML = res.error;
        }

        else
        {
          //console.log("API")
          var decoded = jwt.decode(res.accessToken);
          var user = {accessToken:res.accessToken, UserId:decoded.UserId, Username:decoded.Username, Email:decoded.Email};
          console.log(user)
          
          //console.log(decoded.UserId);
          localStorage.setItem('user', JSON.stringify(user));
          setMessage('');
          window.location.href = './Menu';
        }
      }

      catch(e)
      {
        alert(e.toString());
        return;
      }  
    }
    else{
        document.getElementById('addError').innerHTML = "Please fill out both fields";
    }

   // alert('doIt() ' + loginName.value + ' ' + loginPassword.value);
  };

  // Password Visablility Toggling
  const [PasswordInputType, ToggleIcon] = useTogglePassword();

  return (
    <div id="loginDiv">

      {/* Login Box */}
      <div class="modal-dialog text-center row">
        <div class="col-md-8 login-box">
          <div class="modal-content">
            <form class="col-12" onSubmit={doLogin}>
            
              <div class="form-group usernameBox">
                <input type="text" id="loginName" class="form-control" placeholder="Username or Email" ref={(c) => loginName = c} />
              </div>

              <div class="form-group passwordBox">
                <input type={PasswordInputType} id="loginPassword" class="form-control" placeholder="Password" ref={(c) => loginPassword = c} />
                <span class="password-icon">{ToggleIcon}</span>
              </div>
             
              <button class="btn" id="login" type="button" onClick={doLogin}><i class="fa fa-sign-in-alt"></i> Log In </button>

            </form>

              <a class="signup-login-link links" href="./Signup">Create Account</a> 

              <a class="forgot-password-link links" href="./ForgotPassword">Forgot Password?</a> 
              
              <p id="addError"></p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;