import NavBar from'./components/NavBar.js';
/*import Post from './pages/posts/Post.js';*/
import styles from './App.module.css';
import { Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import SignUpForm from "./pages/auth/SignUpForm";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<h1>Home page</h1>} />
          <Route path="/signin" element={<h1>Sign in</h1>} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="*" element={<p>Page not found!</p>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
