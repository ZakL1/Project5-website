import React from "react";
import styles from "../../styles/Post.module.css";
import {useAuth} from "../../contexts/AuthContext";
import { Card, Figure, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../components/Avatar";
import api from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

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
  } = props;

  const currentUser = useAuth();
  const is_owner = currentUser?.username === owner;
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate.push(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/posts/${id}/`);
      navigate.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await api.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await api.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.Post} style={{ backgroundColor: '#d7e3fc' }}>
      <Card.Body>
        <Figure className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && postPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Figure>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {likes_count}
          <Link to={`/posts/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;