import { useEffect, useState } from "react";
import api from "../../api/axiosDefaults";
import styles from "../../styles/PostCreateEditForm.module.css";
import { FaHeart } from "react-icons/fa";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

const ChallengeList = () => {
  const [challenges, setChallenges] = useState([]);
  const [hideExpired, setHideExpired] = useState(false);

  useEffect(() => {
    api.get("api/challenges/")
      .then((res) => setChallenges(res.data.results))
      .catch((err) => console.error("Error fetching challenges:", err));
  }, []);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const isExpired = (endDate) => {
    return new Date(endDate) < new Date();
  };

  const filteredChallenges = hideExpired
    ? challenges.filter((ch) => !isExpired(ch.end_date))
    : challenges;

  return (
    <Container className="d-flex flex-column align-items-center">
      <h1 className="text-3xl font-bold my-4 text-center">Photo Challenges</h1>

      <div className="mb-3">
        <label className="d-flex align-items-center gap-2">
          <input
            type="checkbox"
            checked={hideExpired}
            onChange={() => setHideExpired((prev) => !prev)}
          />
          Hide expired challenges
        </label>
      </div>

      {filteredChallenges.length > 0 ? (
        filteredChallenges.map((challenge) => (
          <Card key={challenge.id} className={`${styles.Post} w-100 mb-4 p-3`} style={{ backgroundColor: "#d7e3fc" }}>
            <Card.Body>
              {isExpired(challenge.end_date) && (
                <div className="text-center mb-2">
                  <span className="badge bg-secondary">Expired</span>
                </div>
              )}

              <Card.Title className="text-center fs-3">{challenge.title}</Card.Title>
              <Card.Text>{challenge.description}</Card.Text>
              <p className="text-muted">
                {formatDate(challenge.start_date)} – {formatDate(challenge.end_date)}
              </p>
              <p style={{ fontSize: "0.8rem", fontStyle: "italic" }} className="text-muted mt-1">
                Likes counted between start and end dates only.
              </p>

              {challenge.top_posts?.length > 0 && (
                <>
                  <hr style={{ borderTop: "4px solid black", margin: "2rem 0" }} />
                  <h2 className="text-center mb-3">The Current Winners</h2>
                  <div className="d-flex flex-wrap gap-3 justify-content-center">
                    {challenge.top_posts.map((post) => (
                      <div key={post.id} className="text-center">
                        <Image
                          src={post.image}
                          alt={post.title}
                          rounded
                          className="mb-2"
                          style={{
                            height: "45vh",
                            width: "35vh",
                            objectFit: "cover",
                            border: "1px solid #ccc",
                          }}
                        />
                        <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                          by {post.owner}
                        </p>
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