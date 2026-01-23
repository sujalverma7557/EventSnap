import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
  const [open, setOpen] = useState(false);

  const onClickHandler = () => {
    setOpen(!open);
  };

  return (
    <Navbar bg="primary" expand="xl" variant="dark">
      <Navbar.Brand href="/" className="fs-3 px-5">
        CamCoders
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarColor01" onClick={onClickHandler} />
      <Navbar.Collapse id="navbarColor01" className={`justify-content-end ${open ? 'show' : ''}`}>
        <Nav className="ml-auto d-flex align-items-center">
          <Nav.Link href="/" className="active">
            <button type="button" className="btn btn-outline-dark text-white">
              Users
            </button>
            <span className="visually-hidden">(current)</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/Login">
            <button type="button" className="btn btn-outline-dark text-white">
              SignIn
            </button>
          </Nav.Link>
          <NavDropdown title="More Developer Links" id="moreLinksDropdown">
            <NavDropdown.Item href="https://www.youtube.com/@shashwatgautam8108" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i> YOUTUBE{' '}
            </NavDropdown.Item>
            <NavDropdown.Item href="https://www.instagram.com/_shashwat.gautam_1605/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i> INSTAGRAM{' '}
            </NavDropdown.Item>
            <NavDropdown.Item href="https://github.com/ShashwatG16" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i> GITHUB{' '}
            </NavDropdown.Item>
            <NavDropdown.Item href="https://www.youtube.com/@shashwatgautam8108" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-envelope"></i> E-Mail{' '}
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
