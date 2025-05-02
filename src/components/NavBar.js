import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from "../styles/NavBar.module.css";
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaHome, FaUser, FaShare, FaSignInAlt, FaSignOutAlt, FaUserPlus } from "react-icons/fa";
import shutterLogo from '../assets/shutter.png';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  }

  return (
    <Navbar expand="lg" className={styles.NavBar}>
      <Container>
        {/* Shutter Image */}
        <div className={styles.logoContainer}/>
          <img
            src={shutterLogo}
            alt="Shutter Logo"
            className={styles.shutterLogo}
          />
        <Navbar.Brand as={NavLink} to="/" className={styles.NavBarBrand} style={{ fontSize: '4vh' }}>Shutter</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/" className={styles.NavLink}>
          <FaHome style={{ marginRight: '8px' }} />
          Home</Nav.Link>
            {currentUser && (
              <>
              <Nav.Link as={NavLink} to="/profiles/me" className={styles.NavLink}>
              <FaUser style={{ marginRight: '8px' }} />Profile</Nav.Link>
              <Nav.Link as={NavLink} to="/posts/create" className={styles.NavLink}>
              <FaShare style={{ marginRight: '8px' }} />Share</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
          {currentUser ? (
              <>
                <Nav.Link as={NavLink} onClick={handleLogout} className={styles.NavLink}>
                <FaSignOutAlt style={{ marginRight: '8px' }} />Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/signin" className={styles.NavLink}>
                <FaSignInAlt style={{ marginRight: '8px' }} />Sign in</Nav.Link>
                <Nav.Link as={NavLink} to="/signup" className={styles.NavLink}>
                <FaUserPlus style={{ marginRight: '8px' }} />Sign up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
               
export default NavBar;