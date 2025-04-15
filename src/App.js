import { AuthProvider } from "./contexts/AuthContext";
import NavBar from './components/NavBar.js';
/*import Post from './pages/posts/Post.js';*/
import styles from './App.module.css';
import {Route, Routes} from "react-router-dom";
import Container from "react-bootstrap/Container";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import ProfilePage from "./pages/profiles/ProfilePage";

function App() {
    return (
        <AuthProvider>
            <div className={styles.App}>
                <NavBar/>
                <Container>
                    <Routes>
                        <Route path="/" element={<h1> Home page </h1>} />
                        <Route path="/profile" element={< ProfilePage />}/>
                        <Route path="/signin" element={< SignInForm />}/>
                        <Route path="/signup" element={< SignUpForm />}/>
                        <Route path="*" element={<p> Page not found !</p>}/>
                    </Routes>
                </Container>
            </div>
        </AuthProvider>
    );
}

export default App;
