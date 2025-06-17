import { useEffect, useState } from "react";
import api from "../../api/axiosDefaults";
import styles from "../../styles/PostCreateEditForm.module.css";
import { FaHeart } from "react-icons/fa";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

const ChallengeList = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    api.get("api/challenges/")
      .then((res) => setChallenges(res.data.results))
      .catch((err) => console.error("Error fetching challenges:", err));
  }, []);

 return (
    <Container className="d-flex flex-column align-items-center">
      <h1 className="text-3xl font-bold my-4 text-center">Photo Challenges</h1>

      {challenges.length > 0 ? (
        challenges.map((challenge) => (
          <Card key={challenge.id} className={`${styles.Post} w-100 mb-4 p-3`} style={{ backgroundColor: "#d7e3fc" }}>
            <Card.Body>
              <Card.Title className="text-center fs-3">{challenge.title}</Card.Title>
              <Card.Text>{challenge.description}</Card.Text>
              <p className="text-muted mb-3">
                🗓 {challenge.start_date} – {challenge.end_date}
              </p>

              {challenge.top_posts?.length > 0 && (
                <>
                  <h5 className="text-start mb-3">Top Posts</h5>
                  <div className="d-flex flex-wrap gap-3 justify-content-center">
                    {challenge.top_posts.map((post) => (
                      <div key={post.id} className="text-center">
                        <Image
                          src={post.image}
                          alt={post.title}
                          rounded
                          className="mb-2"
                          style={{
                            height: "150px",
                            width: "150px",
                            objectFit: "cover",
                            border: "1px solid #ccc",
                          }}
                        />
                        <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                        by {post.owner}</p>
                        <p className="fw-bold mb-1">{post.title}</p>
                        <div className="d-flex justify-content-center align-items-center gap-1 text-muted mb-1">
                          <FaHeart style={{ color: "#f85032" }} />
                          <span>{post.likes_count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        ))
      ) : (
        <p className="text-center text-muted mt-5">No challenges found.</p>
      )}
    </Container>
  );
};

export default ChallengeList;