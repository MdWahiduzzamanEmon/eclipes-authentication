import React from 'react';
import { FloatingLabel, Form } from "react-bootstrap";
import { Link, useLocation, useHistory } from "react-router-dom";
import useAuth from '../../Hooks/useAuth';


const Login = () => {
    const {
      signInWithGoogle,
      signInWithGithub,
      signInWithTwitter,
      signInUser,
      error,
      handleToGetEmail,
      handleToGetPassword,
      resetPassword,
    } = useAuth();
    const location = useLocation();
    const redirect_url = location.state?.from || '/projects';
    const history = useHistory()
    
    const redirectSignGoogle = () => {
        signInWithGoogle()
          .then((result) => {
              console.log(result.user);
             
           history.push(redirect_url)
          })
          
    }

    const redirectSignGithub = () => {
        signInWithGithub()
            .then((result) => {
                console.log(result.user);
                console.log(location.state?.from);
                history.push(redirect_url);
            })
    }
  const redirectSignTwitter = () => {
    signInWithTwitter()
     .then((result) => {
           console.log(result.user);
          //  console.log(location.state?.from);
           history.push(redirect_url);
          })
  }
    return (
      <div className="container w-50">
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control
            type="email"
            placeholder="name@example.com"
            onBlur={handleToGetEmail}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            type="password"
            placeholder="Password"
            onBlur={handleToGetPassword}
          />
        </FloatingLabel>
        <button className="my-4 btn btn-warning" onClick={signInUser}>
          login{" "}
        </button>
        <button className="btn btn-warning ms-3" onClick={resetPassword}>
          Forget Password
        </button>
        <p>{error}</p>
        <p>or</p>
        <Link
          to="/register"
          style={{
            textDecoration: "none",
            margin: "10px",
            fontWeight: "bold",
            color: "blue",
          }}
        >
          ---Register---
        </Link>
        <br />
        <br />
        <button className="btn btn-warning mx-3" onClick={redirectSignGoogle}>
          Google sign in
        </button>
        <button className="btn btn-warning me-3" onClick={redirectSignGithub}>
          Github sign in
        </button>
        <button className="btn btn-warning" onClick={redirectSignTwitter}>
          Twitter sign in
        </button>
      </div>
    );
};

export default Login;