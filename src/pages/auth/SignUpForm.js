import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import signInImage from "../../assets/signinout.jpg";

import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";

import api from "../../api/axiosDefaults";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the shared `api` instance so the baseURL is correct
      const { data } = await api.post(
        "/dj-rest-auth/registration/",
        signUpData
      );
      console.log("Account created successfully:", data);
      navigate("/signin");
    } catch (err) {
      console.error("Sign-up error:", err.response?.data);
      // Map DRF field errors into our local `errors` state
      setErrors(err.response?.data || {
        non_field_errors: ["Something went wrong, please try again."],
      });
    }
  };

  return (
    <Row
      className={`align-items-center ${styles.Row}`}
      style={{ minHeight: "100vh" }}
    >
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4`}>
          <h1 className={styles.Header}>sign up</h1>
          <Form onSubmit={handleSubmit}>
            {/* Username */}
            <Form.Group controlId="username" className={styles.FormGroup}>
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((msg, idx) => (
              <Alert variant="warning" key={idx}>
                {msg}
              </Alert>
            ))}

            {/* Password */}
            <Form.Group controlId="password1" className={styles.FormGroup}>
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((msg, idx) => (
              <Alert variant="warning" key={idx}>
                {msg}
              </Alert>
            ))}

            {/* Confirm Password */}
            <Form.Group controlId="password2" className={styles.FormGroup}>
              <Form.Label className="d-none">Confirm Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((msg, idx) => (
              <Alert variant="warning" key={idx}>
                {msg}
              </Alert>
            ))}

            {/* Non-field errors */}
            {errors.non_field_errors?.map((msg, idx) => (
              <Alert variant="warning" className="mt-3" key={idx}>
                {msg}
              </Alert>
            ))}

            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              type="submit"
            >
              Sign up
            </Button>
          </Form>
        </Container>

        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account?
            <span>Sign in</span>
          </Link>
        </Container>
      </Col>

      <Col xs={12} md={6} className={`my-auto p-2 ${styles.SignInCol}`}>
        <Image className={styles.Image} src={signInImage} fluid />
      </Col>
    </Row>
  );
};

export default SignUpForm;