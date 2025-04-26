import {Row, Col, Container, Card, Button} from "react-bootstrap";
import {useEffect, useState} from 'react';
import api from '../../api/axiosDefaults';
import styles from "../../styles/Profile.module.css";
import defaultProfile from '../../assets/defaultprofile.png';
import {useNavigate} from 'react-router-dom';

const ProfilePage = () => {
    const [user,
        setUser] = useState(null);
    const [image,
        setImage] = useState('');
    const [isUploading,
        setIsUploading] = useState(false);
    const [posts,
        setPosts] = useState([]);

    const navigate = useNavigate();

    const handleEdit = (postId) => {
        navigate(`/posts/${postId}/edit`);
    };

    /* Collects user's posts */
    useEffect(() => {
        const fetchPosts = async() => {
            try {
                const response = await api.get('/posts/');
                const userPosts = response
                    .data
                    .filter(post => post.owner === user
                        ?.owner);
                setPosts(userPosts);
            } catch (err) {
                console.error("Failed to fetch posts", err);
            }
        };

        if (user) 
            fetchPosts();
        }
    , [user]);

    /* Delete function for owner of posts */
    const handleDelete = async(postId) => {
        try {
            await api.delete(`/posts/${postId}/`);
            setPosts((prevPosts) => prevPosts.filter(post => post.id !== postId));
        } catch (err) {
            console.error("Failed to delete post", err);
        }
    };

    /* Collects users profile from api */
    useEffect(() => {
        api
            .get('profiles/me/')
            .then((response) => {
                console.log('Fetched user profile:', response.data);
                setUser(response.data);
            })
            .catch((error) => {
                console.error('Error fetching user:', error);
            });
    }, []);

    if (!user) 
        return <p>Loading...</p>;
    
    const handleImageUpload = async(e) => {
        const file = e.target.files[0];
        if (!file) 
            return;
        
        const formData = new FormData();
        formData.append('image', file);

        setIsUploading(true);

        const res = await fetch('http://127.0.0.1:8000/profiles/me', {
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

    if (!user) 
        return <p>Loading profile...</p>;
    
    /* Users profile and users posts */
    return (
        <Container fluid className={styles.profileContainer}>
          <Row>
            {/* Left column: Profile card */}
            <Col xs={12} md={4} lg={3} className={styles.profileSidebar}>
              <Card className={styles.profileCard}>
                <Card.Img variant="top" src={defaultProfile} />
                <Card.Body>
                  <Card.Title>{user.owner}</Card.Title>
                  <Card.Text>Bio</Card.Text>
                  <Button variant="primary">Edit profile</Button>
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
                        style={{ objectFit: 'cover', width: '100%', height: '40vh', padding: '2vh' }}
                        src={post.image}
                        alt={post.title}
                      />
                      <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Text>{post.content}</Card.Text>
                        <div className="d-flex justify-content-end gap-2 mt-3">
                          <Button variant="primary" onClick={() => handleEdit(post.id)}>Edit</Button>
                          <Button variant="danger" onClick={() => handleDelete(post.id)}>Delete</Button>
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