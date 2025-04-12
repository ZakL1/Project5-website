import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from "../styles/NavBar.module.css";
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <Navbar expand="lg" className={styles.NavBar}>
      <Container>
        <Navbar.Brand href="#home" className={styles.NavBarBrand}>Website Name</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" className={styles.NavLink}>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/profile" className={styles.NavLink}>Profile</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/signin" className={styles.NavLink}>Sign in</Nav.Link>
            <Nav.Link as={NavLink} to="/signup" className={styles.NavLink}>Sign up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;