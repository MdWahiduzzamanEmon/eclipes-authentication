import { useEffect, useState } from 'react';
import initializeFirebase from '../firebase/firebase.init';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  GithubAuthProvider,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
initializeFirebase();


const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const provider = new TwitterAuthProvider();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [name,setName]=useState("")
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const auth = getAuth();
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const signInWithGithub = () => {
    return signInWithPopup(auth, githubProvider);
  };
  const signInWithTwitter = () => {
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  const handleToGetEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handleToGetPassword = (e) => {
    setUserPassword(e.target.value);
  };
  const updateName = (e) => {
    setName(e.target.value);
  };

  const handleToForm = (e) => {
    e.preventDefault();
    console.log(userEmail, userPassword);
    if (userPassword.length < 6) {
      return alert("Password must be atleast 6 charecter");
    }
    createNewUser(userEmail, userPassword);
    signInUser(userEmail, userPassword);
  };
  // resigtration
  const createNewUser = (userEmail, userPassword) => {
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((result) => {
        // Signed in
        const user = result.user;
        console.log(user);
        updateProfileName();
      })
      .catch((error) => {
        setError(error.message);
        // ..
      });
  };

  //sign in

  const signInUser = () => {
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((result) => {
        setError("")
        console.log(result.user);
      })
      .catch((error) => {
       setError(error.message);
      });
     console.log(userEmail, userPassword);
  }
// update profile 
const updateProfileName = () => {
  updateProfile(auth.currentUser, {
    displayName: name,
  }).then(() => {
    // Profile updated!
    // ...
  });
};
// reset userPassword 
  
  const resetPassword = () => {
    sendPasswordResetEmail(auth, userEmail)
      .then(() => {
        alert("reset password change.check your email")
        // ..
      })
      .catch((error) => {
        // ..
      });
    console.log("reset");
  };
  // logout
  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        // An error happened.
        setError("");
      });
  };
  return {
    user,
    error,
    signInWithGoogle,
    signInWithGithub,
    signInWithTwitter,
    logOut,
    handleToGetEmail,
    handleToForm,
    handleToGetPassword,
    createNewUser,
    signInUser,
    updateName,
    resetPassword,
  };
};

export default useFirebase;