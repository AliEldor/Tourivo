import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

import loginImg from "../assets/images/login-img.png";

import { AuthContext } from "./../context/AuthContext.jsx";
import axiosInstance from "../utils/axios";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { dispatch, error, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });

    try {
      const response = await axiosInstance.post("/auth/login", credentials);

      if (response.data) {
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
        navigate("/");
      }
    } catch (err) {
      console.log("Login error:", err.response?.data);
      dispatch({
        type: "LOGIN_FAILURE",
        payload:
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Invalid email or password. Please try again.",
      });
    }
  };

  return (
    <section className="login-page">
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="Tourivo login" />
              </div>

              <div className="login__form">
                <h2>Welcome Back!</h2>

                {error && <div className="alert alert-danger">{error}</div>}

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      id="email"
                      onChange={handleChange}
                    />
                  </FormGroup>

                  
                </Form>
                <p>
                  Don't have an account yet?{" "}
                  <Link to="/register">Create an account</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
