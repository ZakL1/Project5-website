import { Row, Col, Container, Card, Button } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import api from '../../api/axiosDefaults';
import styles from "../../styles/Profile.module.css";
import defaultProfile from '../../assets/defaultprofile.png';
import { useNavigate } from 'react-router-dom';
import Asset from "../../components/Asset";
import { useAuth } from "../../contexts/AuthContext";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [image, setImage] = useState("");
    const [posts, setPosts] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);  // Added hasLoaded state
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const handleEdit = (postId) => {
        navigate(`/posts/${postId}/edit`);
    };

    /* Collects user's posts */
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('api/posts/');
                const userPosts = response.data.results.filter(post => post.owner === user?.owner)
                setPosts(userPosts);
            } catch (err) {
                console.error("Failed to fetch posts", err);
            }
        };

        if (user) {
            fetchPosts();
        }
    }, [user]);

    /* Delete function for owner of posts */
    const handleDelete = async (postId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) return;
        try {
            await api.delete(`api/posts/${postId}/`);
            setPosts((prevPosts) => prevPosts.filter(post => post.id !== postId));
        } catch (err) {
            console.error("Failed to delete post", err);
        }
    };

    /* Collects user's profile from API */
    useEffect(() => {
        api.get('api/profiles/me/')
            .then((response) => {
                console.log('Fetched user profile:', response.data);
                setUser(response.data);
                setHasLoaded(true);  // Set hasLoaded to true after user profile is fetched
            })
            .catch((error) => {
                console.error('Error fetching user:', error);
                setHasLoaded(true);  // Set hasLoaded to true even if there's an error (stop spinner)
            });
    }, []);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        setIsUploading(true);

        const res = await fetch('https://shutter-api-aad07b464590.herokuapp.com/api/profiles/me/', {
            method: 'POST',
            credentials: 'include', // or add auth headers
            body: formData
        });

        const data = await res.json();
        if (res.ok) {
            setImage(data.profileImageUrl); // Update image in UI
        }

        setIsUploading(false);
    };

    if (!hasLoaded) return <Asset spinner />;  // Show spinner until user and posts are loaded

    if (!user) return <p>Loading profile...</p>;

    /* Delete profile handle */
    const handleProfileDelete = async () => {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete your profile? This cannot be undone."
        );
        if (!confirmDelete) return;
      
        try {
          await api.delete(`api/profiles/${user.id}/`);
          alert("Profile deleted.");
          navigate("/"); // or redirect to login/signup page
        } catch (err) {
          console.error("Failed to delete profile", err);
        }
      };

    /* Users profile and user's posts */
    return (
        <Container fluid className={styles.profileContainer}>
            <Row>
                {/* Left column: Profile card */}
                <Col xs={12} md={4} lg={3} className={styles.profileSidebar}>
                    <Card className={styles.profileCard}>
                    <Card.Img
                      variant="top"
                      src={
                        user.image?.startsWith("http")
                        ? user.image
                        : "https://res.cloudinary.com/dvajuxx87/image/upload/v1746104198/defaultprofile_hwuglk.jpg"
                    }
                />
                        <Card.Body>
                            <Card.Title>{user.owner}</Card.Title>
                            <Card.Text>{user.bio || "No bio available"}</Card.Text>
                            <div className="d-flex justify-content-center gap-2 mt-3">
                            <Button variant="primary" onClick={() => navigate("/profiles/edit")}><FaEdit /></Button>
                            <Button variant="danger" onClick={handleProfileDelete} className="ms-2">
                            <FaTrashAlt/></Button>                           
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Right column: Posts */}
                <Col xs={12} md={8} lg={9}>
                    <h3>Your Posts</h3>

                    <Row>
                        {posts.map((post) => (
                            <Col key={post.id} xs={12} md={6} className="mb-4">
                                <Card style={{ backgroundColor: '#d7e3fc' }}>
                                    <Card.Img
                                        variant="top"
                                        style={{ objectFit: 'cover', width: '100%', height: '40vh', padding: '1vh' }}
                                        src={post.image}
                                        alt={post.title}
                                    />
                                    <Card.Body>
                                        <Card.Title>{post.title}</Card.Title>
                                        <Card.Text>{post.content}</Card.Text>
                                        <div className="d-flex justify-content-end gap-2 mt-3">
                                            <Button variant="primary" onClick={() => handleEdit(post.id)}><FaEdit /></Button>
                                            <Button variant="danger" onClick={() => handleDelete(post.id)}><FaTrashAlt/></Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;            