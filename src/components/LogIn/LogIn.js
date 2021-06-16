
import { useState } from 'react';
import { useContext } from "react";
import {UserContext} from '../../App';
import { useHistory, useLocation } from "react-router-dom";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';

function LogIn() {

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({  
        isSignedIn: false,
        newUser:false,
        name:'',
        email:'',
        password:'',
        photo:'',
        error:'',
        success: false
  })
    initializeLoginFramework()

  const [loggedInUser, setLogggedInUser] = useContext(UserContext);
  const history = useHistory()
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn =() =>{
      handleGoogleSignIn()
      .then(res =>{
          setUser(res)
          setLogggedInUser(res)
      })
  }
  const fbSignIn =()=>{
      handleFbSignIn()
      .then(res =>{
          setUser(res)
          setLogggedInUser(res);
          history.replace(from);
      })
  }

  const signOut =() =>{
      handleSignOut()
      .then(res =>{
          setUser(res)
          setLogggedInUser(res)
      })
  }

  const handleBlur =(e)=>{
    let isFormValid = true;
    if(e.target.name ==='email'){
       isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    
    }
    if(e.target.name ==='password'){
      const isPasswordValid = e.target.value.length > 6;
      const passHasNumber = /\d{1}/.test(e.target.value)
      isFormValid = (isPasswordValid && passHasNumber);
    }
    if(isFormValid){
      const newUserInfo = {...user}; //user state er value gula copy kore newUserInfo te rakhlam.
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit =(e) =>{
      if(newUser && user.email && user.password){  
         createUserWithEmailAndPassword(user.email, user.password)
         .then(res =>{
            setUser(res)
            setLogggedInUser(res);
            history.replace(from);
         })
      }
      //new user sign in code here =>
      if(!newUser && user.email && user.password){
        signInWithEmailAndPassword(user.name, user.email, user.password)
        .then(res =>{
            setUser(res)
            setLogggedInUser(res);
            history.replace(from);            
        })
      }
      e.preventDefault();
  }

  
  return (
    <div style={{textAlign:'center'}}>

          {
              user.isSignedIn ? <button onClick={signOut}>Sign Out</button> 
            :  <button onClick={googleSignIn}>Sign In</button> 
          }
          <br />
          <button onClick={fbSignIn}>Sign in Using facebook</button>

          {
              user.isSignedIn && <div>
                <h3>Welcome, {user.name}</h3>
                <p>Email:{user.email}</p>
                <img src={user.photo} alt="" />
              </div>
          }

          <h1>Our Own Authentication </h1>
          <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" id="" />
          <label htmlFor="newUser">New User Sign In</label>
          <form onSubmit={handleSubmit}>
            {newUser && <input onBlur={handleBlur} type="text" name="name" placeholder='name' />}
            <br />
            <input onBlur={handleBlur} type="text" name='email' placeholder='Email' required/>
            <br />
            <input onBlur={handleBlur} type="password" name='password' placeholder='Password'required/>
            <br />
            <input type="submit" value={newUser?'Sign Up':'Sign in'} />

          </form>
          <p style={{color:'red'}}>{user.error}</p>
          {user.success && <p style={{color:'green'}}>User {newUser?'Created':'Logged In'} Sucessfully</p>}
    </div>
  );
}

export default LogIn;
