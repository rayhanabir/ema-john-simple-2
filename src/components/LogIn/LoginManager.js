import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

 export const initializeLoginFramework =() =>{
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
     }else {
        firebase.app(); // if already initialized, use that one
     }

    
}

//sign goggle sign in functionality =>
export const handleGoogleSignIn =() =>{
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    
    .then(res =>{
      const {displayName, email, photoURL} = res.user;
      const signedInUser = {
        isSignedIn:true,
        name:displayName,
        email:email,
        success: true,
        photo:photoURL
      }
      return signedInUser
      
    })
    .catch(err=>{
      console.log(err)
      console.log(err.message);
    })
  }

   //facebook sign in function =>

  export const handleFbSignIn =() =>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
    .then(res =>{
        const user = res.user;
        user.success=true;
        return user;
    })
    .catch(error =>{
      console.log(error)
    })
  }

   // sign out functionality =>

  export const handleSignOut =()=>{
    return firebase.auth().signOut()
    .then(res =>{
      const signOutUser ={
        isSignedIn:false,
        name:'',
        email:'',
        photo:'',
        success:false
    }
    return signOutUser;
    })

    .catch(err =>{
      console.log(err);
    })
  }

  export const createUserWithEmailAndPassword = (name, email, password) =>{
      return  firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(res =>{
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        updateUserName(name);
        return newUserInfo;
        })
        .catch(error =>{
        const newUserInfo ={};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo
        
        })
  }


  export const signInWithEmailAndPassword = (email, password) =>{
   return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo =res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo
      
    })
    .catch(error =>{
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
    })
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