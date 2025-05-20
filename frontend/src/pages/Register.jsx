import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

import registerImg from "../assets/images/login-img.png";

import { AuthContext } from "./../context/AuthContext.jsx";
import axiosInstance from "../utils/axios";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));

    if (error) setError(null);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post("/auth/register", credentials);

      if (response.data) {
        dispatch({ type: "REGISTER_SUCCESS" });
        navigate("/login");
      }
    } catch (err) {
      console.log("Registration error:", err.response?.data);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

 
};

export default Register;
