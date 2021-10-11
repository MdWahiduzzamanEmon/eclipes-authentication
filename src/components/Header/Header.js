import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const Header = () => {
    const { user, logOut } = useAuth();
    return (
      <div>
        <div className="container py-4 mb-3 text-center">
          <Link
            style={{
              textDecoration: "none",
              margin: "10px",
              fontWeight: "bold",
              color: "Black",
              fontSize: "25px",
            }}
            to="/projects"
          >
            Projects
          </Link>
          <Link
            style={{
              textDecoration: "none",
              margin: "10px",
              fontWeight: "bold",
              color: "Black",
              fontSize: "25px",
            }}
            to="/working"
          >
            Working Groups
          </Link>
          <Link
            style={{
              textDecoration: "none",
              margin: "10px",
              fontWeight: "bold",
              color: "Black",
              fontSize: "25px",
            }}
            to="/members"
          >
            Members
          </Link>
          {user?.uid && (
            <span className="fw-bold text-success ps-3">
              ({user.displayName})
            </span>
          )}
          {!user?.uid ? (
            <Link
              style={{
                textDecoration: "none",
                margin: "10px",
                fontWeight: "bold",
                color: "Black",
                fontSize: "25px",
              }}
              to="/login"
            >
              Log In
            </Link>
          ) : (
            <button
              style={{
                textDecoration: "none",
                margin: "10px",
                fontWeight: "bold",
                color: "Black",
                fontSize: "25px",
                border: "none",
                background: "transparent",
              }}
              onClick={logOut}
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    );
};

export default Header;