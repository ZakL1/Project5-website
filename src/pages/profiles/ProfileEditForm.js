import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosDefaults";
import { useAuth } from "../../contexts/AuthContext";

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

const ProfileEditForm = () => {
  const { setCurrentUser } = useAuth();
  const [profileData, setProfileData] = useState({
    bio: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  const imageInput = useRef(null);
  const navigate = useNavigate();

  const { bio, image } = profileData;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("api/profiles/me/");
        setProfileData({
          bio: data.bio || "",
          image: data.profileImageUrl || "",
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      URL.revokeObjectURL(image);
      setProfileData({
        ...profileData,
        image: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bio", bio);
    if (imageInput.current.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }
    try {
      const { data } = await api.patch("api/profiles/me/", formData);
      setCurrentUser(data);
      navigate("/profiles/me/");
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col xs={12} sm={10} md={8} lg={6} xl={5} className="mx-auto">
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={styles.ImagePreview} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change Photo
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <span className={`${btnStyles.Button} ${btnStyles.Blue}`}>
                    Upload Photo
                  </span>
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
            {errors.image?.map((msg, idx) => (
              <Alert variant="warning" key={idx}>
                {msg}
              </Alert>
            ))}

            <Form.Group>
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="bio"
                value={bio}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.bio?.map((msg, idx) => (
              <Alert variant="warning" key={idx}>
                {msg}
              </Alert>
            ))}

            <div className="mt-3 text-center">
              <Button
                variant="secondary"
                onClick={() => navigate(-1)}
                className="me-2"
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Profile
              </Button>
            </div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
};

export default ProfileEditForm;