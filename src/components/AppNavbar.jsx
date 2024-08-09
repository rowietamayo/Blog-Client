import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function AppNavbar() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            alt=""
            src={"/image/logo.png"}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          My Daily Scribble
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navToggle" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>

            {isLoggedIn ? (
              <Nav.Link as={NavLink} to="/logout">
                Logout
              </Nav.Link>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
