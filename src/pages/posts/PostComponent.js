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
import { FaHeart, FaRegHeart, FaComment, FaTrashAlt, FaPaperPlane } from "react-icons/fa";
import { Alert } from "react-bootstrap";
import Asset from "../../components/Asset";

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
  const [loadingComments, setLoadingComments] = useState(false);

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
    const fetchComments = async () => {
      try {
        setLoadingComments(true);
        const response = await api.get(`api/comments/?post=${id}`);
        setComments(response.data?.results || []);
      } catch (err) {
        console.error("Error fetching comments:", err);
      } finally {
        setLoadingComments(false);
      }
    };
  
    useEffect(() => {
      if (showCommentPanel && comments.length === 0) {
        fetchComments();
      }
    }, [showCommentPanel, id, comments.length]);

  const toggleCommentPanel = () => {
    setShowCommentPanel((prev) => !prev);
  };

  /* Handles comment creation */
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("api/comments/", {
        post: id,
        body: newComment,
      });
      setNewComment("");
      setLocalCommentsCount((prev) => prev + 1);
      fetchComments(); // <-- this is the key part
    } catch (err) {
      console.error(err);
    }
  };

  /* Handles comment deletion */
  const handleDeleteComment = async (commentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmDelete) return;
    try {
      await api.delete(`/api/comments/${commentId}/`);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      setLocalCommentsCount((prev) => Math.max(prev - 1, 0));
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  return (
    <Container className="d-flex justify-content-center">
      <Card className={styles.Post} style={{ backgroundColor: "#d7e3fc" }}>
        <Card.Body>
          <Figure className="d-flex justify-content-start align-items-start mb-3">
            <Avatar
              src={
                profile_image?.startsWith("http")
                  ? profile_image
                  : "https://res.cloudinary.com/dvajuxx87/image/upload/v1746104198/defaultprofile_hwuglk.jpg"
              }
              height={55}
              className="me-2"
            />
            <div>
              <Link to={`/profiles/${profile_id}`} className={styles.owner}>
                {owner}
              </Link>
              <div>
                <small>{formatDate(updated_at)}</small>
              </div>
            </div>
          </Figure>
  
          {title && (
            <Card.Title className="mb-3 text-center" style={{ fontSize: "4vh" }}>
              {title}
            </Card.Title>
          )}
        </Card.Body>
  
        <Link to={`/posts/${id}`}>
          <Card.Img
            src={image}
            alt={title}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "60vh",
              padding: "2vh",
            }}
          />
        </Link>
  
        <Card.Body>
          {content && <Card.Text>{content}</Card.Text>}
  
          <div className={`d-flex justify-content-end align-items-center gap-3 ${styles.PostBar}`}>
            {is_owner ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You can't like your own post!</Tooltip>}
              >
                <span className={styles.DisabledHeart}>
                  <FaRegHeart/>
                </span>
              </OverlayTrigger>
            ) : currentUser ? (
              like_id ? (
                <span onClick={handleUnlike}>
                  <FaHeart className={styles.Heart} />
                </span>
              ) : (
                <span onClick={handleLike}>
                  <FaRegHeart className={styles.DisabledHeart}/>
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
              <FaComment className={styles.CommentButton}/>
            </span>
            {localCommentsCount}
          </div>
  
          {/* Comment Panel */}
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
                <div className="d-flex justify-content-end">
                  <button className="btn btn-primary btn-sm mt-2" type="submit">
                    <FaPaperPlane />
                  </button>
                </div>
                </Form>
              
  
              <div className={styles.CommentList}>
                {loadingComments ? (
                  <Asset spinner />
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className={styles.Comment}>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <strong>{comment.owner}</strong>
                          <p className="mb-1">{comment.body}</p>
                        </div>
                        {currentUser?.username === comment.owner && (
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="btn btn-sm btn-outline-danger"
                          >
                            <FaTrashAlt />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Post;