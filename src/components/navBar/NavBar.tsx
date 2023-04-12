import NavBarLoggedInView from 'components/navBarLoggedInView/NavBarLoggedInView';
import NavBarLoggedOutView from 'components/navBarLoggedOutView/NavBarLoggedOutView';
import { User } from 'models/user'
import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface NavBarProps {
  loggedInUser: User | null;
  onSignUpClicked: () => void;
  onLogedInClicked: () => void;
  onLogutSuccessful: () => void;
}

export default function NavBar({
  loggedInUser,
  onSignUpClicked,
  onLogedInClicked,
  onLogutSuccessful,
}: NavBarProps) {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Cool Notes App
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav>
            <Nav.Link as={Link} to="/privacy">
              Privacy
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            {loggedInUser ? (
              <NavBarLoggedInView
                user={loggedInUser}
                onLogOutSuccessful={onLogutSuccessful}
              />
            ) : (
              <NavBarLoggedOutView
                onLogedInClicked={onLogedInClicked}
                onSignUpClicked={onSignUpClicked}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
