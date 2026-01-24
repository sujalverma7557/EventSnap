import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Header = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const onClickHandler = () => {
    setOpen(!open);
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Navbar bg="primary" expand="xl" variant="dark">
      <Navbar.Brand as={Link} to="/" className="fs-3 px-5">
        EventSnap
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarColor01" onClick={onClickHandler} />
      <Navbar.Collapse id="navbarColor01" className={`justify-content-end ${open ? 'show' : ''}`}>
        <Nav className="ml-auto d-flex align-items-center">
          {userInfo ? (
            <>
              <Nav.Link as={Link} to="/">
                <button type="button" className="btn btn-outline-light btn-sm me-2">
                  Dashboard
                </button>
              </Nav.Link>
              <Nav.Link as={Link} to="/events/new">
                <button type="button" className="btn btn-outline-light btn-sm me-2">
                  Create Event
                </button>
              </Nav.Link>
              <Nav.Link as={Link} to="/events/join">
                <button type="button" className="btn btn-outline-light btn-sm me-2">
                  Join Event
                </button>
              </Nav.Link>
              <Nav.Link as={Link} to="/userProfile">
                <button type="button" className="btn btn-outline-light btn-sm me-2">
                  Profile
                </button>
              </Nav.Link>
              <Nav.Link onClick={logoutHandler}>
                <button type="button" className="btn btn-outline-light btn-sm">
                  Logout
                </button>
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">
                <button type="button" className="btn btn-outline-light btn-sm me-2">
                  Sign In
                </button>
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                <button type="button" className="btn btn-outline-light btn-sm">
                  Sign Up
                </button>
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
