import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosDefaults";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import defaultPost from "../../assets/default-upload.png";

const PostCreateForm = () => {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const imageInput = useRef(null);
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState("");

  const { title, content } = postData;

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle image changes
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      const file = event.target.files[0];
      setImageFile(file);


      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

const handleSubmit = async (event) => {
  event.preventDefault();

  // Frontend validation
  const validationErrors = {};
  if (!title.trim()) validationErrors.title = ["Title is required."];
  if (!content.trim()) validationErrors.content = ["Content is required."];
  if (!imageFile) validationErrors.image = ["Image is required."];

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("image", imageFile);
  if (selectedChallenge) {
    formData.append("challenge", selectedChallenge);
  }

  try {
    await api.post("api/posts/", formData);
    navigate("/", { state: { refreshPosts: true } });
  } catch (err) {
    if (err.response?.status !== 401) {
      setErrors(err.response?.data);
    }
  }
};

// Select the challenge option
useEffect(() => {
  const fetchChallenges = async () => {
    try {
      const { data } = await api.get("api/challenges/");
      setChallenges(data.results || data); // supports pagination or plain array
    } catch (err) {
      console.error("Error fetching challenges", err);
    }
  };
  fetchChallenges();
}, []);

const handleChallengeChange = (event) => {
  setSelectedChallenge(event.target.value);
};

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col xs={12} sm={10} md={8} lg={6} xl={5} className="mx-auto">
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {previewUrl ? (
                <>
                  <figure>
                    <Image
                      className={`${appStyles.Image} ${styles.ImagePreview}`}
                      src={previewUrl}
                      rounded
                    />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change Image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Image src={defaultPost} className={styles.ImagePreview} />
                </Form.Label>
              )}
              <Form.Control
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.title?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group>
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                name="content"
                value={content}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.content?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group>
              <Form.Label>Challenge (optional)</Form.Label>
              <Form.Control
                as="select"
                value={selectedChallenge}
                onChange={handleChallengeChange}
              >
                <option value="">-- Select a challenge --</option>
                {challenges.map((challenge) => (
                  <option key={challenge.id} value={challenge.id}>
                    {challenge.title}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <div className="mt-3 text-center">
              <Button variant="secondary" onClick={() => navigate(-1)} className="me-2">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Create Post
              </Button>
            </div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
};

export default PostCreateForm;