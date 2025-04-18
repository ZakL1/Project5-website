import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from "../styles/NavBar.module.css";
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from 'react-bootstrap/Button';

function NavBar() {
  const { currentUser, handleLogout } = useAuth();

  return (
    <Navbar expand="lg" className={styles.NavBar}>
      <Container>
        <Navbar.Brand as={NavLink} to="/" className={styles.NavBarBrand}>Website Name</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/" className={styles.NavLink}>Home</Nav.Link>
            {currentUser && (
              <>
              <Nav.Link as={NavLink} to="/profiles/me" className={styles.NavLink}>Profile</Nav.Link>
              <Nav.Link as={NavLink} to="/posts/create" className={styles.NavLink}>Share</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
          {currentUser ? (
              <>
                <Nav.Link as={NavLink} onClick={handleLogout} className={styles.NavLink}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/signin" className={styles.NavLink}>Sign in</Nav.Link>
                <Nav.Link as={NavLink} to="/signup" className={styles.NavLink}>Sign up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
               
export default NavBar;