import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/Post.module.css";
import { useAuth } from "../../contexts/AuthContext";
import {
  Card,
  Figure,
  OverlayTrigger,
  Tooltip,
  Form,
  Container
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../components/Avatar";
import api from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import { Alert } from "react-bootstrap";
import defaultPic from '../../assets/defaultprofile.png';

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    image,
    updated_at,
    postPage,
    setPosts,
    postId
  } = props;
  
 
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showCommentPanel, setShowCommentPanel] = useState(false);

  const [localCommentsCount, setLocalCommentsCount] = useState(comments_count);
  const { currentUser, token } = useAuth();
  const is_owner = currentUser?.username === owner;
  const navigate = useNavigate();
  const [showLoginMessage, setShowLoginMessage] = useState(false);

/* Make date easier to read */ 
  function formatDate(isoString) {
    const d = new Date(isoString);
    return d.toLocaleString('en-GB', {
      year:   'numeric',
      month:  'short',   // “Apr”
      day:    '2-digit', // “29”
      hour:   '2-digit',
      minute: '2-digit',
    });
  }


  const handleLike = async () => {
    if (!currentUser?.username) {
      setShowLoginMessage(true);
      return;
    }
    try {
      const { data } = await api.post("api/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) =>
          post.id === id
            ? {
                ...post,
                likes_count: (post.likes_count || 0) + 1, // ensure number
                like_id: data.id,
              }
            : post
        ),
      }));
    } catch (err) {
      console.log(err);
    }
  };
  
  const handleUnlike = async () => {
    if (!currentUser?.username) {
      setShowLoginMessage(true);
      return;
    }
    try {
      await api.delete(`/api/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) =>
          post.id === id
            ? {
                ...post,
                likes_count: Math.max((post.likes_count || 1) - 1, 0), // prevent NaN and negative
                like_id: null,
              }
            : post
        ),
      }));
    } catch (err) {
      console.log(err);
    }
  };


  // Fetch comments for the post
  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (!postId) return; // Avoid request with undefined
        const response = await api.get(`api/comments/?post=${postId}`);
        setComments(response.data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };
    fetchComments();
  }, [postId]);

  const toggleCommentPanel = () => {
    setShowCommentPanel((prev) => !prev);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("api/comments/", {
        post: id,
        body: newComment,
      });
      setNewComment("");
      setLocalCommentsCount((prev) => prev + 1);
      setShowCommentPanel(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="d-flex justify-content-center">
      <Card className={styles.Post} style={{ backgroundColor: '#d7e3fc' }}>
        <Card.Body>
          <Figure className="d-flex justify-content-start align-items-start mb-3">
          <Avatar
            src={profile_image || defaultPic}
            height={55}
            className="me-2"
          />
            <div>
              <Link to={`/profiles/${profile_id}`} className={styles.owner}>
                {owner}
              </Link>
              <div>
                <small>{ formatDate(updated_at) }</small>
              </div>
            </div>
          </Figure>
          {title && (
            <Card.Title  className="mb-3 text-center" style={{ fontSize: '4vh'}}>
              {title}
            </Card.Title>
          )}
        </Card.Body>
  
        <Link to={`/posts/${id}`}>
          <Card.Img
            src={image}
            alt={title}
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '60vh',
              padding: '2vh',
            }}
          />
        </Link>  

        <Card.Body>
        {content && <Card.Text>{content}</Card.Text>}
          <div className={styles.PostBar}>
            {is_owner ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You can't like your own post!</Tooltip>}
              >
                <span className={styles.DisabledHeart}>
                  <FaRegHeart />
                </span>
              </OverlayTrigger>
            ) : currentUser ? (
              like_id ? (
                <span onClick={handleUnlike}>
                  <FaHeart className={styles.Heart} />
                </span>
              ) : (
                <span onClick={handleLike}>
                  <FaRegHeart />
                </span>
              )
            ) : (
              <span onClick={() => setShowLoginMessage(true)}>
                <FaRegHeart />
              </span>
            )}
            <span>{likes_count}</span>
            <span
              onClick={() => {
                if (!currentUser) {
                  setShowLoginMessage(true);
                  return;
                }
                toggleCommentPanel();
              }}
            >
              <FaComment />
            </span>
            {localCommentsCount}
          </div>
  
          {/* Comment Panel (conditionally rendered) */}
          {showCommentPanel && (
            <div className={styles.CommentPanel}>
              <Form onSubmit={handleCommentSubmit}>
                <Form.Group controlId="newComment">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment…"
                  />
                </Form.Group>
                <button
                  className="btn btn-primary btn-sm mt-2"
                  type="submit"
                >
                  Submit Comment
                </button>
              </Form>

              {/* Displaying Comments */}
              <div className={styles.CommentList}>
                {comments.map((comment) => (
                  <div key={comment.id} className={styles.Comment}>
                    <strong>{comment.owner}</strong>
                    <p>{comment.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Post;