import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import signInImage from "../../assets/signinout.jpg"
import axios from "axios";
import {
    Form,
    Button,
    Alert,
    Image,
    Col,
    Row,
    Container
} from "react-bootstrap";
import {useAuth} from "../../contexts/AuthContext";
import api from "../../api/axiosDefaults";

const SignInForm = () => {
    const [signInData,
        setSignInData] = useState({username: "", password: ""});
    const {username, password} = signInData;
    const [errors,
        setErrors] = useState({});
    const navigate = useNavigate();

    // Access setCurrentUser and setToken from context if available. If your
    // AuthContext doesn't have setToken yet, you might want to add it.
    const {login} = useAuth();

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
      });

    const handleChange = (event) => {
        console.log("Input Changed:", event.target.name, event.target.value);
        console.log("Current signInData:", signInData);
        console.log("Changing:", event.target.name, event.target.value);
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          // 1. Login and get token
          const { data: loginData } = await api.post(
            "/dj-rest-auth/login/",
            {
              username: credentials.username,
              password: credentials.password,
            }
          );
    
          const token = loginData.key;
          // 2. Save the token in localStorage
          localStorage.setItem("token", token);
          // 3. Also set the Authorization header on api
          api.defaults.headers.common.Authorization = `Token ${token}`;
    
          // 4. Fetch the current user's profile
          const { data: profile } = await api.get("/profiles/me/");
    
          // 5. Update auth context
          login({ token, user: profile });
    
          // 6. Redirect
          navigate("/profiles/me/");
        } catch (err) {
          console.error("Login error:", err);
          // DRF will return a 400 with { username: [...], password: [...] }
          setErrors(err.response?.data || { non_field_errors: ["Login failed"] });
        }
      };
    return (
        <Row className={`align-items-center ${styles.Row}`} style={{ minHeight: "100vh" }}>
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
                                value={username || ""}
                                onChange={handleChange}/>
                        </Form.Group>
                        {errors.username
                            ?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
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
                                onChange={handleChange}/>
                        </Form.Group>
                        {errors.password
                            ?.map((message, idx) => (
                                <Alert key={idx} variant="warning">
                                    {message}
                                </Alert>
                            ))}
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
                            type="submit">
                            Sign in
                        </Button>
                        {errors.non_field_errors
                            ?.map((message, idx) => (
                                <Alert key={idx} variant="warning" className="mt-3">
                                    {message}
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
                <Image
                    className={styles.Image}
                    src={signInImage}
                    fluid/>
            </Col>
        </Row>
    );
};

export default SignInForm;