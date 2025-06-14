import React, { useState, useEffect, useCallback } from "react";
import styles from "../../styles/Post.module.css";
import { useAuth } from "../../contexts/AuthContext";
import {
  Card,
  Figure,
  OverlayTrigger,
  Tooltip,
  Form,
  Container,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import api from "../../api/axiosDefaults";
import { FaHeart, FaRegHeart, FaComment, FaTrashAlt, FaPaperPlane } from "react-icons/fa";
import Asset from "../../components/Asset";

const Post = (props) => {
  const {
    id,
    owner,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    image,
    updated_at,
    setPosts,
  } = props;

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showCommentPanel, setShowCommentPanel] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [localCommentsCount, setLocalCommentsCount] = useState(comments_count);
  const { currentUser } = useAuth();
  const is_owner = currentUser?.username === owner;
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  function formatDate(isoString) {
    const d = new Date(isoString);
    return d.toLocaleString("en-GB", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Handle likes on a post
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
                likes_count: (post.likes_count || 0) + 1,
                like_id: data.id,
              }
            : post
        ),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // Handle unliking posts
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
                likes_count: Math.max((post.likes_count || 1) - 1, 0),
                like_id: null,
              }
            : post
        ),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch comments on posts
  const fetchComments = useCallback(async () => {
    try {
      setLoadingComments(true);
      const response = await api.get(`api/comments/?post=${id}`);
      setComments(response.data?.results || []);
    } catch (err) {
      console.error("Error fetching comments:", err);
    } finally {
      setLoadingComments(false);
    }
  }, [id]);
  
  useEffect(() => {
    if (showCommentPanel && comments.length === 0) {
      fetchComments();
    }
  }, [showCommentPanel, comments.length, fetchComments]);

  const toggleCommentPanel = () => {
    setShowCommentPanel((prev) => !prev);
  };

  // Handle comment creation
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("api/comments/", {
        post: id,
        body: newComment,
      });
      setNewComment("");
      setLocalCommentsCount((prev) => prev + 1);
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  // Handle comment deletion
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
                {owner}             
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

        <Card.Body>
          {content && <Card.Text>{content}</Card.Text>}

          <div className={`d-flex justify-content-end align-items-center gap-3 ${styles.PostBar}`}>
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
                  <FaRegHeart className={styles.DisabledHeart} />
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
              <FaComment className={styles.CommentButton} />
            </span>
            {localCommentsCount}
          </div>

          {/* Show login prompt if needed */}
          {!currentUser && showLoginMessage && (
            <Alert
              variant="warning"
              onClose={() => setShowLoginMessage(false)}
              dismissible
              className="mt-2"
            >
              Please <Link to="/signin">log in</Link> or <Link to="/signup">create an account</Link> to like or comment.
            </Alert>
          )}

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