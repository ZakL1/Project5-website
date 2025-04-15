import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import axios from "axios";
import {
    Form,
    Button,
    Alert,
    Col,
    Row,
    Container
} from "react-bootstrap";
import {useAuth} from "../../contexts/AuthContext";

const SignInForm = () => {
    const [signInData,
        setSignInData] = useState({username: "", password: ""});
    const {username, password} = signInData;
    const [errors,
        setErrors] = useState({});
    const navigate = useNavigate();

    // Access setCurrentUser and setToken from context if available. If your
    // AuthContext doesn't have setToken yet, you might want to add it.
    const {setCurrentUser, setToken} = useAuth();

    const handleChange = (event) => {
        console.log("Input Changed:", event.target.name, event.target.value);
        console.log("Current signInData:", signInData);
        console.log("Changing:", event.target.name, event.target.value);
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            // 1. Send login credentials to the backend
            const loginRes = await axios.post("http://127.0.0.1:8000/dj-rest-auth/login/", {username, password});

            // 2. Extract token from login response Make sure your backend actually returns
            // the token key (could be named 'token' or something else)
            const authToken = loginRes.data.key;

            // Store token in localStorage (if desired) and in your auth context
            localStorage.setItem("token", authToken);
            if (setToken) {
                setToken(authToken); // If your context provides a setter for the token
            }

            // Optionally, you can set the default Authorization header for future axios
            // requests:
            axios.defaults.headers.common["Authorization"] = `Token ${authToken}`;

            // 3. Now that you have a token, request the current user's profile. Using
            // /profiles/me/ which should return only the logged-in user's profile.
            const profileRes = await axios.get("http://127.0.0.1:8000/profiles/me/");
            console.log("Profile:", profileRes.data);

            // 4. Set the current user in your context (so your app knows the user is logged
            // in)
            setCurrentUser(profileRes.data);

            // 5. Navigate to the homepage (or wherever you wish)
            navigate("/");
        } catch (err) {
            // In case of an error, set the error messages to display.
            setErrors(err.response
                ?.data);
            console.error("Login error:", err.response
                ?.data);
        }
    };
    
    return (
        <Row className={styles.Row}>
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
        </Row>
    );
};

export default SignInForm;