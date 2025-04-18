import { AuthProvider } from "./contexts/AuthContext";
import NavBar from './components/NavBar.js';
import styles from './App.module.css';
import {Route, Routes} from "react-router-dom";
import Container from "react-bootstrap/Container";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import PostEditForm from "./pages/posts/PostEditForm";

function App() {
    return (
        <AuthProvider>
            <div className={styles.App}>
                <NavBar/>
                <Container>
                    <Routes>
                        <Route path="/" element={< PostsPage />} />
                        <Route path="/profiles/me" element={< ProfilePage />}/>
                        <Route path="/signin" element={< SignInForm />}/>
                        <Route path="/signup" element={< SignUpForm />}/>
                        <Route path="/posts/create" element={< PostCreateForm />}/>
                        <Route path="/posts/:id" element={< PostPage />}/>
                        <Route path="/posts/:id" element={< PostEditForm />}/>
                        <Route path="/signup" element={< SignUpForm />}/>
                        <Route path="*" element={<p> Page not found !</p>}/>
                    </Routes>
                </Container>
            </div>
        </AuthProvider>
    );
}

export default App;
