import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Post from "../Post";
import Asset from "./components/Asset";
import PopularProfiles from "./profiles/PopularProfiles";

import appStyles from "./App.module.css";
import styles from "./styles/PostsPage.module.css";

import NoResults from "./assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "./utils/utils";
import { axiosReq } from "./api/axiosDefaults";

function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [query, setQuery] = useState("");

  const { pathname } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(fetchPosts, 1000);

    return () => clearTimeout(timer);
  }, [filter, query, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <div className="d-lg-none mb-3">
          <PopularProfiles mobile />
        </div>

        {/* Search bar */}
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

      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default PostsPage;