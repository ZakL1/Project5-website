import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from "../styles/NavBar.module.css";

function CollapsibleExample() {
  return (
    <Navbar expand="lg" className={styles.NavBar}>
      <Container>
        <Navbar.Brand href="#home" className={styles.NavBarBrand}>Website Name</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className={styles.NavLink}>Home</Nav.Link>
            <Nav.Link href="#profile" className={styles.NavLink}>Profile</Nav.Link>
          </Nav>
          <Nav>
          <Nav.Link href="#login" className={styles.NavLink}>Log in</Nav.Link>
          <Nav.Link href="#logout" className={styles.NavLink}>Log out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;