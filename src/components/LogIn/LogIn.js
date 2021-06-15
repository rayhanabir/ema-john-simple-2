import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
import { useContext } from "react";
import {UserContext} from '../../App';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); 
}



function LogIn() {
  //sign in google start =>
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

  const [loggedInUser, setLogggedInUser] = useContext(UserContext)
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();

  //sign goggle sign in functionality =>
  const handleSignIn =() =>{
    firebase.auth()
    .signInWithPopup(googleProvider)
    .then(res =>{
      const {displayName, email, photoURL} = res.user;
      const signedInUser = {
        isSignedIn:true,
        name:displayName,
        email:email,
        photo:photoURL
      }
      setUser(signedInUser)
      console.log(displayName, email, photoURL);
    })
    .catch(err=>{
      console.log(err)
      console.log(err.message);
    })
  }

  //facebook sign in function =>

  const handleFbSignIn =() =>{
    firebase.auth().signInWithPopup(fbProvider)
    .then(res =>{
      console.log(res)
      console.log(user)
    })
    .catch(error =>{
      console.log(error)
    })
  }

  // sign out functionality =>

  const handleSignOut =()=>{
    firebase.auth().signOut()
    .then(res =>{
      const signOutUser ={
        isSignedIn:false,
        name:'',
        email:'',
        photo:''
    }
    setUser(signOutUser)
    })

    .catch(err =>{
      console.log(err);
    })
  }

  //form validation work start here =>
  
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
          firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
          .then(res =>{
            const newUserInfo ={...user}
            newUserInfo.error = '';
            newUserInfo.success = true;
            setUser(newUserInfo);
           updateUserName(user.name)
          })
          .catch(error =>{
            const newUserInfo ={...user};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser( newUserInfo);
          })
      }
      //new user sign in code here =>
      if(!newUser && user.email && user.password){
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
              const newUserInfo ={...user}
              newUserInfo.error = '';
              newUserInfo.success = true;
              setLogggedInUser(newUserInfo)
              setUser(newUserInfo);
              console.log('sign in user', res.user)
                
            })
            .catch((error) => {
              const newUserInfo ={...user};
              newUserInfo.error = error.message;
              newUserInfo.success = false;
              setUser( newUserInfo);
  });
      }
      e.preventDefault();
  }

  const updateUserName = name =>{
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
      
    }).then(() => {
      console.log('user name updated successfully')
    }).catch((error) => {
      console.log(error)
    });  
  }
  return (
    <div style={{textAlign:'center'}}>

          {
              user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> 
            :  <button onClick={handleSignIn}>Sign In</button> 
          }
          <br />
          <button onClick={handleFbSignIn}>Sign in Using facebook</button>

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
