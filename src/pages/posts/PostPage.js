import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import api from "../../api/axiosDefaults";

import Post from "./Post";
/*import Comment from "../comments/Comment"; */
/*import CommentCreateForm from "../comments/CommentCreateForm";*/

/*import { useCurrentUser } from "../../contexts/CurrentUserContext"; */
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
/*import { fetchMoreData } from "../../utils/utils";*/

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
/*  const [comments, setComments] = useState({ results: [] }); */

/*  const currentUser = useCurrentUser(); */
/*  const profile_image = currentUser?.profile_image; */

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: postData }, { data: commentData }] = await Promise.all([
          api.get(`/posts/${id}`),
          /*api.get(`/comments/?post=${id}`),*/
        ]);
        setPost({ results: [postData] });
        /*setComments(commentData);*/
      } catch (err) {
        console.error(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {/* You can replace this with a proper component later */}
        <p className="d-lg-none">Popular profiles (mobile placeholder)</p>

        <Post {...post.results[0]} setPosts={setPost} postPage />

{/*      <Container className={appStyles.Content}>
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              post={id}
              setPost={setPost}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            <p className="mt-2 fw-bold">Comments</p>
          ) : null}

          {comments.results.length ? (
            <InfiniteScroll
              dataLength={comments.results.length}
              loader={<Asset spinner />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
            >
              {comments.results.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setPost={setPost}
                  setComments={setComments}
                />
              ))}
            </InfiniteScroll> 
          ) : currentUser ? (
            <span>No comments yet. Be the first to comment!</span>
          ) : (
            <span>No comments... yet.</span>
          )}
        </Container>
      </Col>
  
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2"> */}  
        {/* Placeholder for future component */}  
        <p>Popular profiles (desktop placeholder)</p>
      </Col>
    </Row>
  );
};

export default PostPage;