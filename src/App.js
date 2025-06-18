import { AuthProvider } from "./contexts/AuthContext";
import NavBar from './components/NavBar.js';
import styles from './App.module.css';
import { Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostsPage from "./pages/posts/PostsPage";
import PostEditForm from "./pages/posts/PostEditForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import RequireAuth from "./components/RequireAuth";
import ChallengeList from './pages/challenge/ChallengeList';


function App() {
    return (
        <AuthProvider>
            <div className={styles.App}>
                <NavBar />
                <Container>
                    <Routes>
                        <Route path="/" element={<PostsPage />} />
                        <Route path="/profiles/me" element={<ProfilePage />} />
                        <Route path="/profiles/edit" element={
                            <RequireAuth>
                                <ProfileEditForm />
                            </RequireAuth>
                        } />
                        <Route path="/signin" element={<SignInForm />} />
                        <Route path="/signup" element={<SignUpForm />} />
                        <Route path="/posts/create" element={
                            <RequireAuth>
                                <PostCreateForm />
                            </RequireAuth>
                        } />
                        <Route path="/posts/:id/edit" element={<PostEditForm />} />
                        <Route path="/challenges" element={
                            <RequireAuth>
                                <ChallengeList />
                            </RequireAuth>
                        } />
                        <Route path="*" element={<p>Page not found!</p>} />
                    </Routes>
                </Container>
            </div>
        </AuthProvider>
    );
}

export default App;
