import { Row, Col, Container, Card, Button } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import api from '../../api/axiosDefaults';
import styles from "../../styles/Profile.module.css";
import { useNavigate } from 'react-router-dom';
import Asset from "../../components/Asset";
import { useAuth } from "../../contexts/AuthContext";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleEdit = (postId) => {
    navigate(`/posts/${postId}/edit`);
  };

  // Fetch user's posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('api/posts/');
        const userPosts = response.data.results.filter(
          (post) => post.owner === user?.owner
        );
        setPosts(userPosts);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      }
    };

    if (user) {
      fetchPosts();
    }
  }, [user]);

  // Fetch profile data
  useEffect(() => {
    api
      .get('api/profiles/me/')
      .then((response) => {
        setUser(response.data);
        setHasLoaded(true);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
        setHasLoaded(true);
      });
  }, []);

  // Delete post handler
  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`api/posts/${postId}/`);
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  // Delete profile handler
  const handleProfileDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your profile? This cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`api/profiles/${user.id}/`);
      alert("Profile deleted.");
      logout();
      navigate("/signin");
    } catch (err) {
      console.error("Failed to delete profile", err);
    }
  };

  if (!hasLoaded) return <Asset spinner />;
  if (!user) return <p>Loading profile...</p>;

  return (
    <Container fluid className={styles.profileContainer}>
      <Row>
        {/* Profile card */}
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
              <div className="d-flex justify-content-center gap-2 mt-3">
                <Button
                  variant="primary"
                  onClick={() => navigate("/profiles/edit")}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  onClick={handleProfileDelete}
                  className="ms-2"
                >
                  <FaTrashAlt />
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* User's posts */}
        <Col xs={12} md={8} lg={9}>
          <h3>Your Posts</h3>
          <Row>
            {posts.map((post) => (
              <Col key={post.id} xs={12} md={6} className="mb-4">
                <Card style={{ backgroundColor: '#d7e3fc' }}>
                  <Card.Img
                    variant="top"
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '40vh',
                      padding: '1vh',
                    }}
                    src={post.image}
                    alt={post.title}
                  />
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.content}</Card.Text>
                    <div className="d-flex justify-content-end gap-2 mt-3">
                      <Button variant="primary" onClick={() => handleEdit(post.id)}>
                        <FaEdit />
                      </Button>
                      <Button variant="danger" onClick={() => handleDelete(post.id)}>
                        <FaTrashAlt />
                      </Button>
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