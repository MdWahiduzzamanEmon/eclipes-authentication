import React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { Link, useLocation, useHistory } from "react-router-dom";
import useAuth from '../../Hooks/useAuth';


const Register = () => {
  const {
    error,
    signInWithGoogle,
    signInWithGithub,
    signInWithTwitter,
    handleToGetEmail,
    handleToForm,
    handleToGetPassword,
    updateName,
  } = useAuth();
  const location = useLocation();
  const redirect_url = location.state?.from || "/projects";
  const history = useHistory();

  const redirectSignGoogle = () => {
    signInWithGoogle().then((result) => {
      console.log(result.user);

      history.push(redirect_url);
    });
  };

  const redirectSignGithub = () => {
    signInWithGithub().then((result) => {
      console.log(result.user);
      console.log(location.state?.from);
      history.push(redirect_url);
    });
  };
  const redirectSignTwitter = () => {
    signInWithTwitter().then((result) => {
      console.log(result.user);
      //  console.log(location.state?.from);
      history.push(redirect_url);
    });
  };

  
    return (
      <div className="container w-50">
        <Form onSubmit={handleToForm}>
          <FloatingLabel
            controlId="floatingInput"
            label="Enter your name "
            className="mb-3"
          >
            <Form.Control type="text" placeholder="Enter your name" onBlur={ updateName}/>
          </FloatingLabel>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onBlur={handleToGetEmail}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onBlur={handleToGetPassword}
              required
            />
          </Form.Group>

          <button className="my-4 btn btn-warning">Register </button>
        </Form>
        {error}
        <p>or</p>
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            margin: "10px",
            fontWeight: "bold",
            color: "blue",
          }}
        >
          ---Already have an account?---
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

export default Register;