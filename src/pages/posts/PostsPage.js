import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Post from "./PostComponent";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";

import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils"; 
import api from "../../api/axiosDefaults";
import { useAuth } from "../../contexts/AuthContext";

function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({
    results: [],
    next: null,
    previous: null,
    count: 0,
  });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const { currentUser } = useAuth();

  const { pathname } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch all posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get(`api/posts/?${filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };
  
    setHasLoaded(false);
    const timer = setTimeout(fetchPosts, 1000);
  
    if (location.state?.refreshPosts) {
      clearTimeout(timer);
      fetchPosts();
      navigate(location.pathname, { replace: true, state: {} });
    }
  
    return () => clearTimeout(timer);
  
  }, [
    filter,
    query,
    pathname,
    location.pathname,
    location.state?.refreshPosts,
    navigate,
    currentUser,
  ]);

  return (
    <Row className="h-100 justify-content-center">
      <Col className="py-2 p-0 p-lg-2" md={8} lg={6}>
        <div className={styles.SearchBarWrapper}>
          <i className={`fas fa-search ${styles.SearchIcon}`} />
          <Form onSubmit={(e) => e.preventDefault()} className={styles.SearchBar}>
            <Form.Control
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search posts"
            />
          </Form>
        </div>

        {hasLoaded ? (
          posts.results.length ? (
            <InfiniteScroll
              dataLength={posts.results.length}
              next={() => fetchMoreData(posts, setPosts)}
              hasMore={!!posts.next}
              loader={<Asset spinner />}
            >
              {posts.results.map((post) => (
                <Post key={post.id} {...post} setPosts={setPosts} />
              ))}
            </InfiniteScroll>
          ) : (
            <Container className={appStyles.Content}>
              <Asset src={NoResults} message={message} />
            </Container>
          )
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>

    </Row>
  );
}

export default PostsPage;