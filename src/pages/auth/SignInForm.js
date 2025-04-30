import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import signInImage from "../../assets/signinout.jpg";
import { Form, Button, Alert, Image, Col, Row, Container } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api/axiosDefaults";

const SignInForm = () => {
  const [signInData, setSignInData] = useState({ username: "", password: "" });
  const { username, password } = signInData;
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // 1. Login and get token
      const { data: loginData } = await api.post("/dj-rest-auth/login/", {
        username,
        password,
      });
      const token = loginData.key;

      // 2. Save token & set Authorization header
      localStorage.setItem("token", token);
      api.defaults.headers.common.Authorization = `Token ${token}`;

      // 3. Fetch current user profile
      const { data: profile } = await api.get("/profiles/me/");

      // 4. Update context & redirect
      login({ token, user: profile });
      navigate("/profiles/me/");
    } catch (err) {
      console.error("Login error:", err);
      setErrors(
        err.response?.data || { non_field_errors: ["Login failed"] }
      );
    }
  };

  return (
    <Row
      className={`align-items-center ${styles.Row}`}
      style={{ minHeight: "100vh" }}
    >
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4`}>
          <h1 className={styles.Header}>sign in</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username" className={styles.FormGroup}>
              <Form.Label className="d-none">username</Form.Label>
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

            <Form.Group controlId="password" className={styles.FormGroup}>
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password?.map((msg, idx) => (
              <Alert variant="warning" key={idx}>
                {msg}
              </Alert>
            ))}

            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              type="submit"
            >
              Sign in
            </Button>

            {errors.non_field_errors?.map((msg, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {msg}
              </Alert>
            ))}
          </Form>
        </Container>

        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signup">
            Don't have an account?
            <span>Sign up</span>
          </Link>
        </Container>
      </Col>

      <Col xs={12} md={6} className={`my-auto p-2 ${styles.SignInCol}`}>
        <Image className={styles.Image} src={signInImage} fluid />
      </Col>
    </Row>
  );
};

export default SignInForm;